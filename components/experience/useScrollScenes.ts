"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { SCENE_SECTION_IDS, SCENE_KEYFRAMES, type SceneSectionId } from "./scroll-scenes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browsers hide/show their address bar as the page scrolls, which
  // fires a `resize` event on every transition. Without this, ScrollTrigger
  // treats that as a real layout change and recalculates start/end
  // positions mid-scroll, which is what makes the scroll-driven camera/model
  // stutter or jump on phones even though the exact same driver is smooth on
  // desktop. This is GSAP's own documented fix for that mobile-only class of
  // bug and has no effect on desktop scrolling.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Live, mutable scene state that a single R3F useFrame loop damps the
 * actual camera/lights/model toward every frame. Written to imperatively
 * from the scroll driver below rather than through React state, since
 * nothing in the React tree needs to re-render when it changes — the
 * Canvas is the only consumer. */
export interface SceneTarget {
  cameraPosition: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  fov: number;
  keyColor: THREE.Color;
  keyIntensity: number;
  accentAColor: THREE.Color;
  accentAIntensity: number;
  accentBColor: THREE.Color;
  accentBIntensity: number;
  fogColor: THREE.Color;
  fogNear: number;
  fogFar: number;
  modelPosition: THREE.Vector3;
  modelScale: number;
  rotationBias: number;
  activeSection: SceneSectionId;
  sectionProgress: number;
}

export function createSceneTarget(): SceneTarget {
  const first = SCENE_KEYFRAMES.top;
  return {
    cameraPosition: new THREE.Vector3(...first.camera.position),
    cameraTarget: new THREE.Vector3(...first.camera.target),
    fov: first.camera.fov,
    keyColor: new THREE.Color(first.key.color),
    keyIntensity: first.key.intensity,
    accentAColor: new THREE.Color(first.accentA.color),
    accentAIntensity: first.accentA.intensity,
    accentBColor: new THREE.Color(first.accentB.color),
    accentBIntensity: first.accentB.intensity,
    fogColor: new THREE.Color(first.fog.color),
    fogNear: first.fog.near,
    fogFar: first.fog.far,
    modelPosition: new THREE.Vector3(...first.model.position),
    modelScale: first.model.scale,
    rotationBias: first.model.rotationBias,
    activeSection: "top",
    sectionProgress: 0,
  };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp3(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    THREE.MathUtils.lerp(a[0], b[0], t),
    THREE.MathUtils.lerp(a[1], b[1], t),
    THREE.MathUtils.lerp(a[2], b[2], t),
  ];
}

/** Registers one scroll-scrubbed driver against the real page (no synthetic
 * scroll track) and writes the blended camera/lighting/model state into
 * `target` as the reader scrolls past each section's real DOM position. */
export function useScrollScenes(target: SceneTarget) {
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    const update = () => {
      const t = targetRef.current;
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;

      const found = SCENE_SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return { id, top: el.getBoundingClientRect().top + scrollY };
      }).filter((s): s is { id: SceneSectionId; top: number } => s !== null);

      if (found.length === 0) return;

      const focus = scrollY + viewport * 0.5;
      let index = 0;
      for (let i = 0; i < found.length; i++) {
        if (focus >= found[i].top) index = i;
      }
      const nextIndex = Math.min(index + 1, found.length - 1);

      const start = found[index].top;
      const end = index === nextIndex ? start + viewport : found[nextIndex].top;
      const raw = end > start ? (focus - start) / (end - start) : 0;
      const progress = THREE.MathUtils.clamp(raw, 0, 1);
      const eased = easeInOutCubic(progress);

      const from = SCENE_KEYFRAMES[found[index].id];
      const to = SCENE_KEYFRAMES[found[nextIndex].id];

      t.cameraPosition.set(...lerp3(from.camera.position, to.camera.position, eased));
      t.cameraTarget.set(...lerp3(from.camera.target, to.camera.target, eased));
      t.fov = THREE.MathUtils.lerp(from.camera.fov, to.camera.fov, eased);

      t.keyColor.set(from.key.color).lerp(new THREE.Color(to.key.color), eased);
      t.keyIntensity = THREE.MathUtils.lerp(from.key.intensity, to.key.intensity, eased);
      t.accentAColor.set(from.accentA.color).lerp(new THREE.Color(to.accentA.color), eased);
      t.accentAIntensity = THREE.MathUtils.lerp(from.accentA.intensity, to.accentA.intensity, eased);
      t.accentBColor.set(from.accentB.color).lerp(new THREE.Color(to.accentB.color), eased);
      t.accentBIntensity = THREE.MathUtils.lerp(from.accentB.intensity, to.accentB.intensity, eased);

      t.fogColor.set(from.fog.color).lerp(new THREE.Color(to.fog.color), eased);
      t.fogNear = THREE.MathUtils.lerp(from.fog.near, to.fog.near, eased);
      t.fogFar = THREE.MathUtils.lerp(from.fog.far, to.fog.far, eased);

      t.modelPosition.set(...lerp3(from.model.position, to.model.position, eased));
      t.modelScale = THREE.MathUtils.lerp(from.model.scale, to.model.scale, eased);
      t.rotationBias = THREE.MathUtils.lerp(from.model.rotationBias, to.model.rotationBias, eased);

      t.activeSection = found[index].id;
      t.sectionProgress = progress;
    };

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: update,
      onRefresh: update,
    });

    const refresh = () => ScrollTrigger.refresh();
    update();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      trigger.kill();
    };
  }, []);
}
