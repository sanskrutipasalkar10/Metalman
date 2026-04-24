import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Center, Environment, Float, PresentationControls, Stage, Grid } from "@react-three/drei";

const STLModel = ({ url }: { url: string }) => {
  // Use useMemo to avoid reloading unless URL changes
  const geom = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.5;
      // Pulsing effect for the wireframe
      const s = 1.005 + Math.sin(t * 2) * 0.002;
      wireRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geom}>
        <meshStandardMaterial 
          color="#3b82f6" 
          metalness={0.9} 
          roughness={0.1} 
          emissive="#3b82f6" 
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* High-tech wireframe overlay */}
      <mesh ref={wireRef} geometry={geom}>
        <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const RotatingAssemblyFallback = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.4;
      group.current.rotation.x = t * 0.15;
    }
  });

  const steel = "#3b82f6";
  const orange = "#f97316";

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[2.4, 2.4, 2.4]} />
        <meshBasicMaterial color={steel} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial color={steel} metalness={0.85} roughness={0.25} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 2.8, 32]} />
        <meshStandardMaterial color={orange} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

const ScanningPlane = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = Math.sin(t * 1.5) * 2.5;
      // Pulse opacity
      if (ref.current.material instanceof THREE.MeshBasicMaterial) {
        ref.current.material.opacity = 0.1 + Math.sin(t * 3) * 0.05;
      }
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial color="#f97316" transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
};

interface CADWireframeProps {
  stlUrl?: string | null;
}

export const CADWireframe = ({ stlUrl }: CADWireframeProps) => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <Stage environment="city" intensity={0.6} contactShadow={{ opacity: 0.7, blur: 2 }} adjustCamera={1.2}>
            {stlUrl ? <STLModel url={stlUrl} /> : <group />}
          </Stage>
        </PresentationControls>
        
        <ScanningPlane />
        <Grid 
          renderOrder={-1} 
          position={[0, -1.5, 0]} 
          infiniteGrid 
          cellSize={1} 
          cellThickness={1} 
          sectionSize={3} 
          sectionThickness={1.5} 
          sectionColor="#3b82f6" 
          fadeDistance={30} 
        />
      </Suspense>
    </Canvas>
  );
};