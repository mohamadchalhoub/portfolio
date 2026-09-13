"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@/content/site";
import type { SceneTarget } from "../useScrollScenes";
import type { DeviceTier } from "@/hooks/use-device-tier";

const HEX_SIZE = 0.42;

function hexPositions(radius: number): [number, number, number][] {
  const positions: [number, number, number][] = [];
  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      if (Math.abs(q + r) > radius) continue;
      const x = HEX_SIZE * 1.5 * q;
      const z = HEX_SIZE * (Math.sqrt(3) * 0.5 * q + Math.sqrt(3) * r);
      positions.push([x, 0, z]);
    }
  }
  return positions;
}

/** A honeycomb of small hex nodes extending behind the core in Toolbox —
 * an abstract network/grid motif rather than a wall of tool logos. */
export function HexGrid({ target, deviceTier }: { target: SceneTarget; deviceTier: DeviceTier }) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => hexPositions(deviceTier === "full" ? 3 : 1), [deviceTier]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const isActive = target.activeSection === "toolbox";
    const scale = THREE.MathUtils.damp(group.scale.x, isActive ? 1 : 0, 2.2, delta);
    group.scale.setScalar(scale);
    group.rotation.y += delta * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, -0.6, -3]} rotation={[Math.PI / 2, 0, 0]} scale={0}>
      {positions.map((position, i) => (
        <mesh key={i} position={position}>
          <cylinderGeometry args={[HEX_SIZE * 0.42, HEX_SIZE * 0.42, 0.04, 6]} />
          <meshStandardMaterial
            color={PALETTE.engineering}
            emissive={PALETTE.engineering}
            emissiveIntensity={0.35}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}
