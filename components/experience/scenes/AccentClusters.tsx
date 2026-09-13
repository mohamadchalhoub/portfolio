"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@/content/site";
import type { SceneTarget } from "../useScrollScenes";

/** Two small wireframe clusters flanking the core in Capabilities — cyan
 * (engineering) and amber (security), echoing the two capability cards
 * without adding any new copy. */
export function AccentClusters({ target }: { target: SceneTarget }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const isActive = target.activeSection === "capabilities";
    const scale = THREE.MathUtils.damp(group.scale.x, isActive ? 1 : 0, 2.2, delta);
    group.scale.setScalar(scale);
    if (leftRef.current) leftRef.current.rotation.y += delta * 0.3;
    if (rightRef.current) rightRef.current.rotation.y -= delta * 0.25;
  });

  return (
    <group ref={groupRef} scale={0}>
      <mesh ref={leftRef} position={[-2.1, 0.3, -0.8]}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={PALETTE.engineering}
          emissive={PALETTE.engineering}
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={rightRef} position={[2.1, -0.2, -0.8]}>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color={PALETTE.security}
          emissive={PALETTE.security}
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}
