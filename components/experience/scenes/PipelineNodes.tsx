"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { PALETTE } from "@/content/site";
import { PROCESS_STEPS } from "@/content/process";
import type { SceneTarget } from "../useScrollScenes";

const SPAN = 3.6;

/** A chain of glowing nodes, one per PROCESS_STEPS entry (Understand →
 * Architect → Build → Test → Secure → Deliver), lighting up left-to-right
 * as the reader scrolls through Working Method — driven by that section's
 * own scroll progress rather than duplicating a separate DOM observer. */
export function PipelineNodes({ target }: { target: SceneTarget }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  const nodePositions = useMemo<[number, number, number][]>(() => {
    const count = PROCESS_STEPS.length;
    return PROCESS_STEPS.map((_, i) => {
      const t = count > 1 ? i / (count - 1) : 0;
      return [(t - 0.5) * SPAN, Math.sin(t * Math.PI) * 0.35, -1.8] as [number, number, number];
    });
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const isActive = target.activeSection === "method";
    const scale = THREE.MathUtils.damp(group.scale.x, isActive ? 1 : 0, 2.2, delta);
    group.scale.setScalar(scale);

    const activeIndex = Math.floor(THREE.MathUtils.clamp(target.sectionProgress, 0, 0.999) * PROCESS_STEPS.length);
    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      const material = node.material as THREE.MeshStandardMaterial;
      const lit = i <= activeIndex;
      material.emissiveIntensity = THREE.MathUtils.damp(
        material.emissiveIntensity,
        lit ? 1.5 : 0.25,
        3,
        delta
      );
    });
  });

  return (
    <group ref={groupRef} scale={0}>
      <Line points={nodePositions} color={PALETTE.engineering} lineWidth={1} transparent opacity={0.35} />
      {nodePositions.map((position, i) => (
        <mesh
          key={PROCESS_STEPS[i].id}
          position={position}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={PALETTE.engineering} emissive={PALETTE.engineering} emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  );
}
