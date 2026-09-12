import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "./scrollState";

const ACCENT = "#5b7cff";
const ACCENT_SOFT = "#8fa4ff";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function CoreForm() {
  const groupRef = useRef();
  const meshRef = useRef();
  const wireRef = useRef();

  // Camera-facing zoom is handled by moving this group along z, driven by
  // scroll progress: scrolling down pushes the form away (zoom out),
  // scrolling up pulls it back close (zoom in).
  useFrame((state, delta) => {
    const p = scrollState.progress;

    // Continuous slow idle rotation, plus an extra turn mapped to scroll
    // so the form visibly rotates as the page moves, not just spins forever.
    const idle = state.clock.elapsedTime * 0.12;
    const scrollSpin = p * Math.PI * 1.4;
    if (meshRef.current) {
      meshRef.current.rotation.x = idle * 0.6 + p * 0.8;
      meshRef.current.rotation.y = idle + scrollSpin;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -idle * 0.4 + p * 0.5;
      wireRef.current.rotation.y = -idle * 0.7 - scrollSpin * 0.6;
    }

    if (groupRef.current) {
      // z travel: close (zoomed in) near top of page -> far (zoomed out) at bottom
      const targetZ = lerp(0, -6.2, p);
      groupRef.current.position.z = lerp(
        groupRef.current.position.z,
        targetZ,
        Math.min(1, delta * 3)
      );

      // subtle mouse parallax tilt
      const targetRotX = scrollState.mouseY * 0.15;
      const targetRotY = scrollState.mouseX * 0.2;
      groupRef.current.rotation.x = lerp(
        groupRef.current.rotation.x,
        targetRotX,
        Math.min(1, delta * 2)
      );
      groupRef.current.rotation.y = lerp(
        groupRef.current.rotation.y,
        targetRotY,
        Math.min(1, delta * 2)
      );

      // gentle bob
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.15, 0.34, 220, 32, 2, 3]} />
        <meshPhysicalMaterial
          color={ACCENT}
          roughness={0.25}
          metalness={0.65}
          clearcoat={0.6}
          clearcoatRoughness={0.3}
          emissive={ACCENT}
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh ref={wireRef} scale={1.55}>
        <torusKnotGeometry args={[1.15, 0.34, 90, 12, 2, 3]} />
        <meshBasicMaterial color={ACCENT_SOFT} wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function Particles() {
  const ref = useRef();
  const count = 220;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18 - 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={ACCENT_SOFT} size={0.02} transparent opacity={0.5} />
    </points>
  );
}

function CameraRig() {
  useFrame((state, delta) => {
    const targetX = scrollState.mouseX * 0.3;
    const targetY = scrollState.mouseY * 0.2;
    state.camera.position.x = lerp(state.camera.position.x, targetX, Math.min(1, delta * 2));
    state.camera.position.y = lerp(state.camera.position.y, targetY, Math.min(1, delta * 2));
    state.camera.lookAt(0, 0, -2);
  });
  return null;
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.4], fov: 45 }}
      >
        <color attach="background" args={["#07070b"]} />
        <fog attach="fog" args={["#07070b", 4, 13]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 3, 4]} intensity={1.4} color={ACCENT} />
        <pointLight position={[-4, -2, -2]} intensity={0.6} color={ACCENT_SOFT} />
        <CoreForm />
        <Particles />
        <CameraRig />
      </Canvas>
    </div>
  );
}
