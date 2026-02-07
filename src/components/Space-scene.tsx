"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, Float, Environment, Text } from "@react-three/drei"
import { useRef, useMemo, Suspense } from "react"
import * as THREE from "three"

function Planet() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.001
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      glowRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={[0, 0, 0]}>
        {/* Main planet */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshStandardMaterial
            color="#0e7490"
            emissive="#06b6d4"
            emissiveIntensity={0.3}
            roughness={0.6}
            metalness={0.4}
          />
        </mesh>

        {/* Planet atmosphere glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[2.0, 64, 64]} />
          <meshStandardMaterial
            color="#06b6d4"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0.2, 0]}>
          <torusGeometry args={[3.0, 0.08, 16, 100]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Second ring */}
        <mesh rotation={[Math.PI / 2.5, 0.4, 0.1]}>
          <torusGeometry args={[3.5, 0.04, 16, 100]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null)
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.03 + 0.01
    }
    return s
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#06b6d4"
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function OrbitingMoons() {
  const group1Ref = useRef<THREE.Group>(null)
  const group2Ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group1Ref.current) {
      group1Ref.current.rotation.y = t * 0.3
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.y = -t * 0.2
      group2Ref.current.rotation.x = Math.sin(t * 0.1) * 0.2
    }
  })

  return (
    <>
      <group ref={group1Ref}>
        <mesh position={[4.5, 0.5, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial
            color="#e2e8f0"
            emissive="#94a3b8"
            emissiveIntensity={0.3}
            roughness={0.8}
          />
        </mesh>
      </group>
      <group ref={group2Ref}>
        <mesh position={[5.5, -0.3, 1]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </>
  )
}

function CameraRig() {
  const { camera } = useThree()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    camera.position.x = Math.sin(t * 0.1) * 0.5
    camera.position.y = Math.cos(t * 0.15) * 0.3
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function SpaceScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#050a14"]} />

          {/* Lighting */}
          <ambientLight intensity={0.15} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
          <pointLight position={[-10, -5, -10]} intensity={0.5} color="#8b5cf6" />
          <spotLight
            position={[5, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            color="#0ea5e9"
          />

          {/* Stars background */}
          <Stars
            radius={100}
            depth={80}
            count={6000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />

          {/* Main planet */}
          <Planet />

          {/* Orbiting moons */}
          <OrbitingMoons />

          {/* Floating particles */}
          <FloatingParticles />

          {/* Camera animation */}
          <CameraRig />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
