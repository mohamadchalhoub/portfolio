"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { PALETTE } from "@/content/site";
import type { SceneTarget } from "../useScrollScenes";

const LINE_COUNT = 6;

/** Thin drifting circuit-trace lines behind the About section — ambient
 * atmosphere, not new content. */
export function TraceLines({ target }: { target: SceneTarget }) {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    return Array.from({ length: LINE_COUNT }, (_, i) => {
      const y = (i - LINE_COUNT / 2) * 0.35;
      const points: [number, number, number][] = [
        [-3.8, y, -1.8 - i * 0.15],
        [-1.2, y + 0.2, -0.7],
        [1.6, y - 0.15, -1.4 - i * 0.1],
      ];
      return points;
    });
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const isActive = target.activeSection === "about";
    const scale = THREE.MathUtils.damp(group.scale.x, isActive ? 1 : 0, 2.2, delta);
    group.scale.setScalar(scale);
    group.rotation.y += delta * 0.02;
  });

  return (
    <group ref={groupRef} scale={0}>
      {lines.map((points, i) => (
        <Line key={i} points={points} color={PALETTE.engineering} lineWidth={1} transparent opacity={0.4} />
      ))}
    </group>
  );
}
