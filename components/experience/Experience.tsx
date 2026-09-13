"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { OrbitalCoreModel } from "@/components/three/OrbitalCoreModel";
import { createSceneTarget, useScrollScenes, type SceneTarget } from "./useScrollScenes";
import type { DeviceTier } from "@/hooks/use-device-tier";
import { TraceLines } from "./scenes/TraceLines";
import { AccentClusters } from "./scenes/AccentClusters";
import { HexGrid } from "./scenes/HexGrid";
import { ShieldRings } from "./scenes/ShieldRings";
import { PipelineNodes } from "./scenes/PipelineNodes";

const DAMP_LAMBDA = 3.2;

/** Damps the live camera/lights/fog/model toward the scroll-driven target
 * every frame — the one place per-frame three.js state actually mutates. */
function SceneRig({ target, deviceTier }: { target: SceneTarget; deviceTier: DeviceTier }) {
  const { camera, scene } = useThree();
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const accentARef = useRef<THREE.PointLight>(null);
  const accentBRef = useRef<THREE.PointLight>(null);
  const modelGroupRef = useRef<THREE.Group>(null);
  const currentTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    const lambda = DAMP_LAMBDA;
    const colorAlpha = 1 - Math.pow(0.001, d);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.cameraPosition.x, lambda, d);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.cameraPosition.y, lambda, d);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.cameraPosition.z, lambda, d);
    currentTarget.x = THREE.MathUtils.damp(currentTarget.x, target.cameraTarget.x, lambda, d);
    currentTarget.y = THREE.MathUtils.damp(currentTarget.y, target.cameraTarget.y, lambda, d);
    currentTarget.z = THREE.MathUtils.damp(currentTarget.z, target.cameraTarget.z, lambda, d);
    camera.lookAt(currentTarget);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.damp(camera.fov, target.fov, lambda, d);
      camera.updateProjectionMatrix();
    }

    if (keyLightRef.current) {
      keyLightRef.current.color.lerp(target.keyColor, colorAlpha);
      keyLightRef.current.intensity = THREE.MathUtils.damp(
        keyLightRef.current.intensity,
        target.keyIntensity,
        lambda,
        d
      );
    }
    if (accentARef.current) {
      accentARef.current.color.lerp(target.accentAColor, colorAlpha);
      accentARef.current.intensity = THREE.MathUtils.damp(
        accentARef.current.intensity,
        target.accentAIntensity,
        lambda,
        d
      );
    }
    if (accentBRef.current) {
      accentBRef.current.color.lerp(target.accentBColor, colorAlpha);
      accentBRef.current.intensity = THREE.MathUtils.damp(
        accentBRef.current.intensity,
        target.accentBIntensity,
        lambda,
        d
      );
    }

    if (!(scene.fog instanceof THREE.Fog)) {
      scene.fog = new THREE.Fog(target.fogColor.getHex(), target.fogNear, target.fogFar);
    }
    const fog = scene.fog as THREE.Fog;
    fog.color.lerp(target.fogColor, colorAlpha);
    fog.near = THREE.MathUtils.damp(fog.near, target.fogNear, lambda, d);
    fog.far = THREE.MathUtils.damp(fog.far, target.fogFar, lambda, d);

    if (modelGroupRef.current) {
      const group = modelGroupRef.current;
      // On narrow/touch viewports the DOM layout collapses every section's
      // multi-column grid (Hero's text+visual columns included) to one
      // stacked column, so there's no longer a side of the screen the core
      // can occupy without sitting under text. Rather than authoring a
      // second, mobile-specific keyframe table, shrink and push the whole
      // model back uniformly on this tier — quiet enough everywhere that it
      // reads as background atmosphere instead of competing with content.
      // Keep this a *visible* reduction, not a near-zero one: at the 0.1
      // scale this used to be, the core shrank past the point of reading as
      // anything on a real phone screen, which is what made the whole
      // cinematic layer look broken/absent on mobile rather than just
      // quieter than desktop.
      const mobileScale = deviceTier === "reduced" ? 0.45 : 1;
      const mobileZPush = deviceTier === "reduced" ? -1.4 : 0;
      group.position.x = THREE.MathUtils.damp(group.position.x, target.modelPosition.x, lambda, d);
      group.position.y = THREE.MathUtils.damp(group.position.y, target.modelPosition.y, lambda, d);
      group.position.z = THREE.MathUtils.damp(group.position.z, target.modelPosition.z + mobileZPush, lambda, d);
      group.rotation.y = THREE.MathUtils.damp(group.rotation.y, target.rotationBias, lambda, d);
      const scale = THREE.MathUtils.damp(group.scale.x, target.modelScale * mobileScale, lambda, d);
      group.scale.setScalar(scale);
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} color="#c9e8ff" />
      <directionalLight ref={keyLightRef} position={[3, 4, 2]} intensity={1.4} castShadow={deviceTier === "full"} />
      <pointLight ref={accentARef} position={[-3, 1, 2]} distance={12} decay={2} intensity={1.2} />
      <pointLight ref={accentBRef} position={[3, -1, 2]} distance={12} decay={2} intensity={0} />

      <Environment resolution={deviceTier === "full" ? 256 : 128}>
        <Lightformer intensity={1.5} rotation={[-Math.PI / 2, 0, 0]} position={[0, 4, 0]} scale={[6, 6, 1]} />
        <Lightformer
          intensity={1.2}
          color="#00D4C8"
          rotation={[0, Math.PI / 2, 0]}
          position={[4, 1, 0]}
          scale={[4, 4, 1]}
        />
        <Lightformer intensity={0.6} rotation={[0, -Math.PI / 2, 0]} position={[-4, 0, 2]} scale={[3, 3, 1]} />
      </Environment>

      <group ref={modelGroupRef}>
        <OrbitalCoreModel interactive={false} />
      </group>

      <TraceLines target={target} />
      <AccentClusters target={target} />
      <HexGrid target={target} deviceTier={deviceTier} />
      <ShieldRings target={target} />
      <PipelineNodes target={target} />

      {deviceTier === "full" && (
        <ContactShadows
          position={[0, -0.9, 0]}
          opacity={0.4}
          scale={8}
          blur={2.4}
          far={3}
          resolution={512}
          color="#000000"
        />
      )}
    </>
  );
}

/** The fixed, full-page cinematic layer: one Canvas that stays mounted
 * behind every section, its camera/lighting/model choreographed by scroll
 * position via useScrollScenes. Purely decorative (aria-hidden,
 * pointer-events-none) — every real interactive element lives in the DOM
 * above it. */
export function Experience({ deviceTier }: { deviceTier: DeviceTier }) {
  const target = useMemo(() => createSceneTarget(), []);
  useScrollScenes(target);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={deviceTier === "full" ? [1, 1.75] : [1, 1]}
        shadows={deviceTier === "full"}
        camera={{ position: [3.1, 2.35, 3.55], fov: 32 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.85,
        }}
      >
        <Suspense fallback={null}>
          <SceneRig target={target} deviceTier={deviceTier} />
        </Suspense>
      </Canvas>
    </div>
  );
}
