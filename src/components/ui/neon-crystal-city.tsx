"use client";

import React, { FC, useRef, useEffect, useState, useCallback } from "react";

export interface NeonCrystalCityProps {
  /** Forward movement speed multiplier (default: 5) */
  cameraSpeed?: number;
  /** Size of each city block tile (default: 2) */
  tileSize?: number;
  /** Smooth-union factor k (default: 0.5) */
  unionK?: number;
  /** Number of ray-march steps (default: 100) */
  maxSteps?: number;
  /** Maximum ray distance (default: 100) */
  maxDist?: number;
  /** Surface hit threshold (default: 0.001) */
  surfDist?: number;
  /** Additional wrapper CSS classes */
  className?: string;
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** Show the "move to explore" hint (default: true) */
  showHint?: boolean;
}


const vsSource = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Emerald-green themed GLSL shader — portfolio palette (#22c55e / #10b981)
const fsSource = `#version 300 es
precision highp float;

uniform vec2  u_resolution;   // actual canvas pixel size (DPR scaled)
uniform float u_dpr;           // device pixel ratio
uniform float u_time;
uniform vec2  u_mouse;         // CSS-pixel mouse coords
uniform float u_cameraSpeed;
uniform float u_tileSize;
uniform float u_unionK;
uniform int   u_maxSteps;
uniform float u_maxDist;
uniform float u_surfDist;

out vec4 fragColor;

// ── Hash & noise ─────────────────────────────────────────────────────────────
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// ── SDF primitives ────────────────────────────────────────────────────────────
float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float opSmoothUnion(float d1, float d2, float k) {
  float h = clamp(0.5 + 0.5*(d2 - d1)/k, 0.0, 1.0);
  return mix(d2, d1, h) - k*h*(1.0 - h);
}

// ── Scene SDF ─────────────────────────────────────────────────────────────────
float getDist(vec3 p) {
  vec2 id  = floor(p.xz / u_tileSize);
  vec3 lp  = p;
  lp.xz = mod(p.xz, u_tileSize) - u_tileSize * 0.5;

  float n  = hash(id);
  float h  = 1.2 + n * 5.0;          // taller buildings
  float hw = 0.35 + hash(id + 0.5) * 0.15; // varied widths

  float b  = sdBox(lp - vec3(0.0, h - 1.0, 0.0), vec3(hw, h, hw));

  // Crystal spire on tall buildings
  if (n > 0.75) {
    float s = length(lp - vec3(0.0, h * 2.1, 0.0)) - 0.4;
    b = opSmoothUnion(b, s, u_unionK);
  }

  float ground = p.y + 1.0;
  return min(b, ground);
}

// ── Raymarching ───────────────────────────────────────────────────────────────
float rayMarch(vec3 ro, vec3 rd) {
  float d = 0.0;
  for (int i = 0; i < u_maxSteps; i++) {
    float s = getDist(ro + rd * d);
    d += s;
    if (d > u_maxDist || abs(s) < u_surfDist) break;
  }
  return d;
}

// ── Normal estimation ─────────────────────────────────────────────────────────
vec3 getNormal(vec3 p) {
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    getDist(p + e.xyy) - getDist(p - e.xyy),
    getDist(p + e.yxy) - getDist(p - e.yxy),
    getDist(p + e.yyx) - getDist(p - e.yyx)
  ));
}

// ── Emerald palette (tight green range, no red/blue bleed) ────────────────────
vec3 palette(float t) {
  // Oscillates between #059669 (dark emerald) and #34d399 (bright emerald)
  vec3 a = vec3(0.04, 0.55, 0.35);
  vec3 b = vec3(0.04, 0.40, 0.20);
  vec3 c = vec3(0.50, 1.00, 0.60);
  vec3 d = vec3(0.00, 0.20, 0.45);
  return clamp(a + b * cos(6.28318 * (c * t + d)), 0.0, 1.0);
}

// ── Window light pattern on building faces ────────────────────────────────────
float windowLights(vec3 p, vec2 id) {
  // Grid of lit windows — some flicker with time
  vec2 wuv   = fract(p.xz * 4.0 + 0.5);  // window UV on face
  vec2 wid   = floor(p.xz * 4.0 + 0.5);
  float wn   = hash(wid + id * 3.7 + floor(p.y * 2.0));
  float flicker = step(0.55, fract(wn * 7.3 + u_time * (wn * 0.4 + 0.1)));
  vec2  border  = smoothstep(0.0, 0.12, wuv) * smoothstep(1.0, 0.88, wuv);
  return flicker * border.x * border.y * step(0.42, wn);
}

void main() {
  // Normalize to CSS-pixel UV space (divide gl_FragCoord by dpr to get CSS px)
  vec2 cssFrag = gl_FragCoord.xy / u_dpr;
  vec2 cssRes  = u_resolution / u_dpr;
  vec2 uv = (cssFrag * 2.0 - cssRes) / cssRes.y;

  // Camera: elevated for a better city overview, moves forward
  vec3 ro = vec3(0.5, 1.8, u_time * u_cameraSpeed);
  vec3 rd = normalize(vec3(uv, 1.5));    // slightly narrower FOV = more depth

  // Mouse-look: u_mouse is CSS pixels, cssRes is CSS pixels — same space
  float mx = (u_mouse.x / cssRes.x - 0.5) * 1.8;
  float my = (u_mouse.y / cssRes.y - 0.5) * 0.9;
  mat3 rotX = mat3(1.0, 0.0, 0.0,  0.0, cos(my), -sin(my),  0.0, sin(my), cos(my));
  mat3 rotY = mat3(cos(mx), 0.0, sin(mx),  0.0, 1.0, 0.0,  -sin(mx), 0.0, cos(mx));
  rd = rotY * rotX * rd;

  float dist = rayMarch(ro, rd);
  vec3  col  = vec3(0.0);

  if (dist < u_maxDist) {
    vec3  p      = ro + rd * dist;
    vec2  id     = floor(p.xz / u_tileSize);
    float n      = hash(id);
    vec3  normal = getNormal(p);
    vec3  bColor = palette(n + u_time * 0.06);

    // ── Building face ambient body color (pitch black to make neon edges pop) ──
    col += bColor * 0.0;

    // ── Vertical neon strip glow ──────────────────────────────────────────────
    float lines = abs(fract(p.y * 1.8) - 0.5);
    float glow  = pow(0.008 / max(lines, 0.003), 1.3);
    col += bColor * glow * 0.10;

    // ── Animated window lights ────────────────────────────────────────────────
    if (p.y > -0.5) {
      float wins = windowLights(p, id);
      col += bColor * wins * 0.4;
    }

    // ── Scan-line accent flicker ──────────────────────────────────────────────
    float scan = abs(fract(p.y * 6.0 + u_time * 0.4) - 0.5) * 0.06;
    col += vec3(0.13, 0.88, 0.49) * scan;

    // ── Ground grid ───────────────────────────────────────────────────────────
    if (p.y < -0.8) {
      vec2  gp      = fract(p.xz * 0.4);
      float gLine   = min(gp.x, gp.y);
      float gGlow   = smoothstep(0.04, 0.0, gLine) * 0.6;
      // Moving pulse along grid lines
      float pulse   = 0.5 + 0.5 * sin(p.x * 1.5 - u_time * 2.0)
                          * sin(p.z * 1.5 + u_time * 1.5);
      col += vec3(0.08, 0.85, 0.44) * gGlow * (0.5 + 0.5 * pulse);
    }
  }

  // ── Atmospheric fog (dark deep teal) ─────────────────────────────────────────
  vec3 fogColor = vec3(0.0, 0.02, 0.015);
  col = mix(col, fogColor, smoothstep(0.0, u_maxDist * 0.7, dist));

  // ── Vignette ─────────────────────────────────────────────────────────────────
  float vignette = 1.0 - length(uv * 0.32);
  col *= clamp(vignette, 0.0, 1.0);

  // ── Tonemapping + gamma ───────────────────────────────────────────────────────
  col = col / (col + 0.4);           // simple Reinhard
  col = pow(max(col, 0.0), vec3(0.8));

  fragColor = vec4(col, 1.0);
}
`;


const NeonCrystalCity: FC<NeonCrystalCityProps> = ({
  cameraSpeed = 5,
  tileSize    = 2,
  unionK      = 0.5,
  maxSteps    = 100,
  maxDist     = 100,
  surfDist    = 0.001,
  className   = "",
  ariaLabel   = "Neon Crystal City shader background",
  showHint    = true,
}) => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const frameId = useRef<number>(0);
  const mouse   = useRef({ x: 0, y: 0 });
  const start   = useRef<number>(Date.now());

  // Auto-dismiss hint after 4 s
  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(() => setHintVisible(false), 4000);
    return () => clearTimeout(t);
  }, [showHint]);

  const dismissHint = useCallback(() => setHintVisible(false), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl2") as WebGL2RenderingContext | null)
            ?? (canvas.getContext("webgl")  as WebGLRenderingContext  | null);

    if (!gl) {
      setError("WebGL not supported in this browser.");
      return;
    }

    // ── Compile helper ────────────────────────────────────────────────────────
    const compileShader = (type: GLenum, src: string): WebGLShader | null => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        setError("Shader compile error (see console)");
        return null;
      }
      return sh;
    };

    // ── Compile & link ────────────────────────────────────────────────────────
    const vs = compileShader(gl.VERTEX_SHADER,   vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      setError("Program link error (see console)");
      return;
    }

    // ── Uniform locations ─────────────────────────────────────────────────────
    const posLoc   = gl.getAttribLocation(prog,  "a_position");
    const resLoc   = gl.getUniformLocation(prog, "u_resolution");
    const dprLoc   = gl.getUniformLocation(prog, "u_dpr");
    const timeLoc  = gl.getUniformLocation(prog, "u_time");
    const mouseLoc = gl.getUniformLocation(prog, "u_mouse");
    const speedLoc = gl.getUniformLocation(prog, "u_cameraSpeed");
    const tileLoc  = gl.getUniformLocation(prog, "u_tileSize");
    const unionLoc = gl.getUniformLocation(prog, "u_unionK");
    const stepsLoc = gl.getUniformLocation(prog, "u_maxSteps");
    const maxLoc   = gl.getUniformLocation(prog, "u_maxDist");
    const surfLoc  = gl.getUniformLocation(prog, "u_surfDist");

    // ── Full-screen quad ──────────────────────────────────────────────────────
    const quadBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );

    // ── Mouse tracking (on window so overlaid UI doesn't block it) ───────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Canvas-relative CSS-pixel coordinates (Y flipped for WebGL)
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = rect.height - (e.clientY - rect.top);
      dismissHint();
    };
    const onTouchMove = (e: TouchEvent) => {
      const rect  = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouse.current.x = touch.clientX - rect.left;
      mouse.current.y = rect.height - (touch.clientY - rect.top);
      dismissHint();
    };
    // Listen on window — not the canvas — so overlaid elements don't block it
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove",  onTouchMove, { passive: true });

    // ── Resize handler ────────────────────────────────────────────────────────
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ── Render loop ───────────────────────────────────────────────────────────
    const render = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);

      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const now = (Date.now() - start.current) * 0.001;
      // u_resolution = actual canvas pixels (matches gl_FragCoord)
      // u_dpr = dpr so shader can convert to CSS pixels for mouse math
      gl.uniform2f(resLoc,   canvas.width, canvas.height);
      gl.uniform1f(dprLoc,   dpr);
      gl.uniform1f(timeLoc,  now);
      // Mouse coords are in CSS pixels — shader handles the conversion
      gl.uniform2f(mouseLoc, mouse.current.x, mouse.current.y);
      gl.uniform1f(speedLoc, cameraSpeed);
      gl.uniform1f(tileLoc,  tileSize);
      gl.uniform1f(unionLoc, unionK);
      gl.uniform1i(stepsLoc, maxSteps);
      gl.uniform1f(maxLoc,   maxDist);
      gl.uniform1f(surfLoc,  surfDist);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId.current = requestAnimationFrame(render);
    };
    frameId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove",  onTouchMove);
      gl.deleteProgram(prog);
      gl.deleteBuffer(quadBuf);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraSpeed, tileSize, unionK, maxSteps, maxDist, surfDist, dismissHint]);

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {error && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center text-emerald-400 font-mono text-sm p-4 text-center">
          {error}
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ touchAction: "none" }}
      />

      {/* Mouse-look hint — fades out on first interaction or after 4 s */}
      {showHint && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{
            opacity: hintVisible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <div className="flex flex-col items-center gap-3">
            {/* Animated cursor ring */}
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border border-emerald-400/40 animate-ping" />
              <div className="absolute inset-[6px] rounded-full border border-emerald-400/60" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.35em] text-emerald-400/70 uppercase select-none">
              move to explore
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export { NeonCrystalCity };
export default NeonCrystalCity;
