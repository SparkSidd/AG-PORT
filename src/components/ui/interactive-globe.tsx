"use client"
import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface InteractiveGlobeProps {
  size?: number
  dotColor?: string
  arcColor?: string
  markerColor?: string
  className?: string
}

function GlobeMesh({ dotColor: _dotColor = "rgba(34,197,94,0.6)", arcColor: _arcColor = "rgba(16,185,129,0.4)", markerColor: _markerColor = "rgba(16,185,129,1)" }: InteractiveGlobeProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Sphere dots
  const dots = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let phi = 0; phi < Math.PI; phi += 0.15) {
      for (let theta = 0; theta < Math.PI * 2; theta += 0.15) {
        const r = 2
        points.push(new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        ))
      }
    }
    return points
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(dots)
    return g
  }, [dots])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2
  })

  return (
    <group ref={groupRef}>
      <points geometry={geo}>
        <pointsMaterial color="#22c55e" size={0.04} transparent opacity={0.7} />
      </points>
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2.01, 32, 32]} />
        <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.04} />
      </mesh>
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[2.05, 16, 16]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

export function InteractiveGlobe(props: InteractiveGlobeProps) {
  const sz = props.size || 460
  return (
    <div style={{ width: sz, height: sz, maxWidth: "100%", maxHeight: "100%" }} className={props.className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#22c55e" />
        <GlobeMesh {...props} />
      </Canvas>
    </div>
  )
}

export default InteractiveGlobe
