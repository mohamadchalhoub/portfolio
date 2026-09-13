"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@/content/site";
import type { SceneTarget } from "../useScrollScenes";

const RING_RADII = [0.75, 1.05, 1.35];

/** A "lockdown" motif for Security Research: concentric rings pulsing
 * outward around the core, plus a thin scan line sweeping vertically. */
export function ShieldRings({ target }: { target: SceneTarget }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const scanRef = useRef<THREE.Mesh>(null);
  const clock = useRef(0);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const isActive = target.activeSection === "security";
    const scale = THREE.MathUtils.damp(group.scale.x, isActive ? 1 : 0, 2.2, delta);
    group.scale.setScalar(scale);

    clock.current += delta;
    ringRefs.current.forEach((ring, i) => {
      if (!ring) return;
      const pulse = 1 + Math.sin(clock.current * 1.4 + i * 0.8) * 0.04;
      ring.scale.setScalar(pulse);
    });

    if (scanRef.current) {
      scanRef.current.position.y = Math.sin(clock.current * 0.9) * 0.9;
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      {RING_RADII.map((radius, i) => (
        <mesh
          key={radius}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[radius, 0.008, 8, 64]} />
          <meshStandardMaterial
            color={PALETTE.security}
            emissive={PALETTE.security}
            emissiveIntensity={0.9}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}
      <mesh ref={scanRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 1.45, 48]} />
        <meshBasicMaterial color={PALETTE.security} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
