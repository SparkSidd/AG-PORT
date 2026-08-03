"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRevealRadius;
  uniform float uRevealSoftness;
  uniform float uPixelSize;
  uniform float uMouseActive;
  uniform vec2 uResolution;
  uniform float uImageAspect;
  
  uniform float uWaveSpeed;
  uniform float uWaveFrequency;
  uniform float uWaveAmplitude;
  uniform float uMouseRadius;
  
  varying vec2 vUv;
  
  float bayer4x4(vec2 pos) {
    int x = int(mod(pos.x, 4.0));
    int y = int(mod(pos.y, 4.0));
    int index = x + y * 4;
    
    float pattern[16];
    pattern[0] = 0.0;    pattern[1] = 8.0;    pattern[2] = 2.0;    pattern[3] = 10.0;
    pattern[4] = 12.0;   pattern[5] = 4.0;    pattern[6] = 14.0;   pattern[7] = 6.0;
    pattern[8] = 3.0;    pattern[9] = 11.0;   pattern[10] = 1.0;   pattern[11] = 9.0;
    pattern[12] = 15.0;  pattern[13] = 7.0;   pattern[14] = 13.0;  pattern[15] = 5.0;
    
    for (int i = 0; i < 16; i++) {
        if (i == index) return pattern[i] / 16.0;
    }
    return 0.0;
  }
  
  void main() {
    // object-fit: cover logic
    float screenAspect = uResolution.x / uResolution.y;
    vec2 uv = vUv;
    
    if (screenAspect > uImageAspect) {
        // Screen is wider than image. Crop top/bottom.
        float scale = uImageAspect / screenAspect;
        uv.y = (uv.y - 0.5) * scale + 0.5;
    } else {
        // Screen is taller than image. Crop sides.
        float scale = screenAspect / uImageAspect;
        uv.x = (uv.x - 0.5) * scale + 0.5;
    }
    
    float time = uTime;
    
    vec2 distortedUv = uv;

    
    if (uMouseActive > 0.01) {
        vec2 mousePos = uMouse;
        float dist = distance(uv, mousePos);
        float mouseInfluence = smoothstep(uMouseRadius, 0.0, dist);
        
        float rippleFreq = uWaveFrequency * 5.0;
        float rippleSpeed = uWaveSpeed * 1.0;
        float rippleStrength = uWaveAmplitude * 0.05;
        
        float ripple = sin(dist * rippleFreq - time * rippleSpeed) * rippleStrength * mouseInfluence * uMouseActive;
        distortedUv.x += ripple;
        distortedUv.y += ripple;
    }
    
    vec4 color = texture2D(uTexture, distortedUv);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    
    // Apply a light shadow boost so the image details are visible
    gray = pow(gray, 0.8);
    
    vec2 pixelCoord = floor(gl_FragCoord.xy / uPixelSize);
    float dither = bayer4x4(pixelCoord);
    
    float adjusted = gray + (dither - 0.5) * 0.5;
    vec3 ditheredColor;
    
    // Theme colors matching a dark green terminal
    vec3 colorDark = vec3(0.0, 0.016, 0.031);  // #000408
    vec3 colorMid = vec3(0.027, 0.212, 0.125);  // #073620 (Dark Forest Green)
    vec3 colorLight = vec3(0.063, 0.725, 0.506); // #10b981 (Vibrant Emerald)
    
    if (adjusted < 0.35) {
        ditheredColor = colorDark;
    } else if (adjusted < 0.7) {
        ditheredColor = colorMid;
    } else {
        ditheredColor = colorLight;
    }
    
    float revealDist = distance(uv, uMouse);
    float innerRadius = uRevealRadius * (1.0 - uRevealSoftness);
    float outerRadius = uRevealRadius;
    float revealAmount = 1.0 - smoothstep(innerRadius, outerRadius, revealDist);
    revealAmount *= uMouseActive;
    
    vec3 finalColor = mix(ditheredColor, color.rgb, revealAmount);
    
    gl_FragColor = vec4(finalColor, color.a);
  }
`;

interface ImagePlaneProps {
  src: string;
  aspectRatio: number;
  revealRadius: number;
  revealSoftness: number;
  pixelSize: number;
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  mouseRadius: number;
  isMouseInCanvas: boolean;
}

function ImagePlane({
  src,
  aspectRatio,
  revealRadius,
  revealSoftness,
  pixelSize,
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  mouseRadius,
  isMouseInCanvas,
}: ImagePlaneProps) {
  const texture = useTexture(src);
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();
  const mouseActiveRef = useRef(0);
  const hasEnteredRef = useRef(false);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(-10, -10) },
      uRevealRadius: { value: revealRadius },
      uRevealSoftness: { value: revealSoftness },
      uPixelSize: { value: pixelSize },
      uMouseActive: { value: 0 },
      uWaveSpeed: { value: waveSpeed },
      uWaveFrequency: { value: waveFrequency },
      uWaveAmplitude: { value: waveAmplitude },
      uMouseRadius: { value: mouseRadius },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uImageAspect: { value: aspectRatio }
    }),
    [texture, revealRadius, revealSoftness, pixelSize, waveSpeed, waveFrequency, waveAmplitude, mouseRadius, aspectRatio]
  );

  const scale = useMemo<[number, number, number]>(() => {
    if (aspectRatio > 1) {
      return [aspectRatio, 1, 1];
    } else {
      return [1, 1 / aspectRatio, 1];
    }
  }, [aspectRatio]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;

      if (isMouseInCanvas) hasEnteredRef.current = true;

      const targetActive = isMouseInCanvas ? 1 : 0;
      mouseActiveRef.current += (targetActive - mouseActiveRef.current) * 0.08;
      material.uniforms.uMouseActive.value = mouseActiveRef.current;
      // Update resolution uniform on resize
      material.uniforms.uResolution.value.set(viewport.width, viewport.height);
      
      if (hasEnteredRef.current) {
        material.uniforms.uMouse.value.set(
          (pointer.x + 1) / 2,
          (pointer.y + 1) / 2
        );
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface RevealWaveImageProps {
  src: string;
  revealRadius?: number;
  revealSoftness?: number;
  pixelSize?: number;
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  mouseRadius?: number;
  className?: string;
}

export const RevealWaveImage = ({
  src,
  revealRadius = 0.2,
  revealSoftness = 0.5,
  pixelSize = 3,
  waveSpeed = 0.5,
  waveFrequency = 3.0,
  waveAmplitude = 0.2,
  mouseRadius = 0.2,
  className = "h-full w-full",
}: RevealWaveImageProps) => {
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    };
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsMouseInCanvas(true)}
      onMouseLeave={() => setIsMouseInCanvas(false)}
    >
      {aspectRatio !== null && (
        <Canvas
          style={{ width: "100%", height: "100%", display: "block" }}
          gl={{ antialias: false }}
          camera={{ position: [0, 0, 1] }}
        >
          <Suspense fallback={null}>
            <ImagePlane
              src={src}
              aspectRatio={aspectRatio}
              revealRadius={revealRadius}
              revealSoftness={revealSoftness}
              pixelSize={pixelSize}
              waveSpeed={waveSpeed}
              waveFrequency={waveFrequency}
              waveAmplitude={waveAmplitude}
              mouseRadius={mouseRadius}
              isMouseInCanvas={isMouseInCanvas}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};
