"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Terminal, Database, Server, Cpu, Code2, Network, ShieldAlert } from 'lucide-react';

interface ParallaxLayer {
  src?: string;
  node?: React.ReactNode;
  alt: string;
  speedX: number;
  speedY: number;
  speedZ: number;
  rotation: number;
  distance: number;
  className?: string;
  zIndex: number;
  initialTop: string;
  initialLeft: string;
  width?: string;
}

interface ParallaxHeroProps {
  layers?: ParallaxLayer[];
  title?: string;
  className?: string;
  showText?: boolean;
}

// Constructed "Cyber Core" tech layers using Unsplash + Lucide nodes
const defaultLayers: ParallaxLayer[] = [
  // Deep Background Layer - Brutalist Server Architecture (Darkened)
  {
    src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2000',
    alt: 'Server Core',
    speedX: 0.03,
    speedY: 0.038,
    speedZ: 0,
    rotation: 0,
    distance: -200,
    zIndex: 1,
    initialTop: 'calc(50% - 50px)',
    initialLeft: 'calc(50%)',
    width: '3000px',
    className: 'opacity-20 mix-blend-lighten grayscale',
  },
  // Deep Code Layer - Abstract glowing data
  {
    src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2000',
    alt: 'Digital Geometry',
    speedX: 0.06,
    speedY: 0.08,
    speedZ: 0.1,
    rotation: 0.02,
    distance: 1000,
    zIndex: 2,
    initialTop: 'calc(50%)',
    initialLeft: 'calc(50% + 200px)',
    width: '2400px',
    className: 'opacity-10 mix-blend-color-dodge grayscale',
  },
  
  // Floating Tech Nodes (Lucide Icons acting as mid-ground elements transparently)
  {
    node: <Server className="w-full h-full text-emerald-500/30" />,
    alt: 'Server Node',
    speedX: 0.12,
    speedY: 0.15,
    speedZ: 0.2,
    rotation: 0.1,
    distance: 1500,
    zIndex: 3,
    initialTop: 'calc(50% - 300px)',
    initialLeft: 'calc(50% - 500px)',
    width: '180px',
    className: 'drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]',
  },
  {
    node: <Database className="w-full h-full text-emerald-600/30" />,
    alt: 'Database Node',
    speedX: 0.16,
    speedY: 0.11,
    speedZ: 0.15,
    rotation: -0.1,
    distance: 1800,
    zIndex: 4,
    initialTop: 'calc(50% + 150px)',
    initialLeft: 'calc(50% + 450px)',
    width: '120px',
  },
  {
    node: <Cpu className="w-full h-full text-green-400/40" />,
    alt: 'CPU Node',
    speedX: 0.2,
    speedY: 0.18,
    speedZ: 0.3,
    rotation: 0.15,
    distance: 2100,
    zIndex: 5,
    initialTop: 'calc(50% + 200px)',
    initialLeft: 'calc(50% - 350px)',
    width: '150px',
  },
  {
    node: <Network className="w-full h-full text-emerald-400/25" />,
    alt: 'Network Mesh',
    speedX: 0.08,
    speedY: 0.1,
    speedZ: 0.25,
    rotation: -0.05,
    distance: 2400,
    zIndex: 6,
    initialTop: 'calc(50% - 250px)',
    initialLeft: 'calc(50% + 300px)',
    width: '250px',
  },
  {
    node: <Code2 className="w-full h-full text-zinc-500/20" />,
    alt: 'Code Blocks',
    speedX: 0.25,
    speedY: 0.22,
    speedZ: 0.4,
    rotation: 0.2,
    distance: 3000,
    zIndex: 7,
    initialTop: 'calc(50%)',
    initialLeft: 'calc(50% - 600px)',
    width: '200px',
  },
  {
    node: <ShieldAlert className="w-full h-full text-red-500/20" />,
    alt: 'Security Node',
    speedX: 0.15,
    speedY: 0.08,
    speedZ: 0.35,
    rotation: 0.08,
    distance: 3500,
    zIndex: 8,
    initialTop: 'calc(50% + 300px)',
    initialLeft: 'calc(50% + 600px)',
    width: '100px',
  },
  {
    node: <Terminal className="w-full h-full text-emerald-300/40" />,
    alt: 'Terminal Node Foreground',
    speedX: 0.05,
    speedY: 0.04,
    speedZ: 0.5,
    rotation: -0.15,
    distance: 4000,
    zIndex: 9,
    initialTop: 'calc(50% - 100px)',
    initialLeft: 'calc(50% + 700px)',
    width: '160px',
    className: 'drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]',
  },
  
  // Dense Neural/Optical Line Layer covering the front
  {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2000',
    alt: 'Cyber Fiber Optic',
    speedX: 0.15,
    speedY: 0.02,
    speedZ: 0,
    rotation: 0,
    distance: 4200,
    zIndex: 10,
    initialTop: 'calc(100% - 200px)',
    initialLeft: 'calc(50%)',
    width: '2500px',
    className: 'opacity-10 mix-blend-screen',
  },
];

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  layers = defaultLayers,
  title = 'ARCHITECTURE',
  className,
  showText = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursorPosition = e.clientX;
      const xVal = e.clientX - window.innerWidth / 2;
      const yVal = e.clientY - window.innerHeight / 2;
      const rotateDeg = (xVal / (window.innerWidth / 2)) * 20;

      layerRefs.current.forEach((el, index) => {
        if (!el) return;

        const layer = layers[index];
        const { speedX, speedY, speedZ, rotation } = layer;

        const computedLeft = parseFloat(
          getComputedStyle(el).left.replace('px', '')
        );
        const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
        const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;

        el.style.transform = `perspective(2300px) translateZ(${
          zValue * speedZ
        }px) rotateY(${rotateDeg * rotation}deg) translateX(calc(-50% + ${
          -xVal * speedX
        }px)) translateY(calc(-50% + ${yVal * speedY}px))`;
      });

      if (textRef.current) {
        const textSpeedX = 0.07;
        const textSpeedY = 0.05;
        const textSpeedZ = 0.08;
        const textRotation = 0.04;

        const computedLeft = parseFloat(
          getComputedStyle(textRef.current).left.replace('px', '')
        );
        const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
        const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;

        textRef.current.style.transform = `perspective(2300px) translateZ(${
          zValue * textSpeedZ
        }px) rotateY(${rotateDeg * textRotation}deg) translateX(calc(-50% + ${
          -xVal * textSpeedX
        }px)) translateY(calc(-50% + ${yVal * textSpeedY}px))`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [layers]);

  return (
    <main
      ref={containerRef}
      className={cn(
        'relative h-full w-full overflow-hidden bg-[#0c0c0c] flex items-center justify-center font-sans pointer-events-auto',
        className
      )}
    >
      <div className="absolute inset-0 z-[100] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(12,12,12,0)_20%,rgba(12,12,12,0.95)_100%)]" />

      {layers.map((layer, index) => {
        const style = {
            width: layer.width,
            top: layer.initialTop,
            left: layer.initialLeft,
            zIndex: layer.zIndex,
            transform: 'translate(-50%, -50%)',
        };

        if (layer.node) {
            return (
                <div
                    key={index}
                    ref={(el) => {
                      if (el) layerRefs.current[index] = el;
                    }}
                    className={cn('absolute pointer-events-none transition-transform duration-[450ms] ease-out', layer.className)}
                    style={style}
                >
                    {layer.node}
                </div>
            )
        }

        return (
          <img
            key={index}
            ref={(el) => {
              if (el) layerRefs.current[index] = el;
            }}
            src={layer.src}
            alt={layer.alt}
            className={cn(
              'absolute pointer-events-none transition-transform duration-[450ms] ease-out',
              layer.className
            )}
            style={style}
          />
        );
      })}

      {showText && (
        <div
          ref={textRef}
          className="absolute z-[9] text-white text-center pointer-events-auto transition-transform duration-[450ms] ease-out flex flex-col items-center gap-4"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h1 className="font-black text-[12vw] md:text-[8vw] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-[0_10px_20px_rgba(34,197,94,0.15)] uppercase">
            {title}
          </h1>
          <p className="font-mono text-emerald-500 tracking-[0.4em] text-xs md:text-sm uppercase bg-emerald-500/10 px-4 py-2 rounded border border-emerald-500/20">
            [ DEEP_SYSTEM_PARALLAX_ENGAGED ]
          </p>
        </div>
      )}
    </main>
  );
};
