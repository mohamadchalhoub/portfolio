import { PALETTE } from "@/content/site";

/** Pure data: one cinematic "shot" per page section. useScrollScenes.ts
 * interpolates between a section's own keyframe and the next section's as
 * the reader scrolls through it, so the camera/lighting/model arrive at
 * each section's framing exactly as that section reaches the viewport.
 *
 * `model.scale`/`model.position` deliberately shrink and push the core off
 * to one side for every section with real body copy (work, security,
 * method, contact) — QA screenshots of an earlier pass showed the
 * full-size, centered core sitting directly over paragraph text and
 * accordion rows in those sections, which is exactly the legibility
 * problem this whole layer has to avoid. Sections with short, sparse text
 * (top, about, capabilities, toolbox) can afford a larger, more central
 * core. */

export const SCENE_SECTION_IDS = [
  "top",
  "about",
  "capabilities",
  "toolbox",
  "work",
  "security",
  "method",
  "contact",
] as const;

export type SceneSectionId = (typeof SCENE_SECTION_IDS)[number];

export interface SceneKeyframe {
  camera: { position: [number, number, number]; target: [number, number, number]; fov: number };
  key: { color: string; intensity: number };
  accentA: { color: string; intensity: number };
  accentB: { color: string; intensity: number };
  fog: { color: string; near: number; far: number };
  model: { position: [number, number, number]; rotationBias: number; scale: number };
}

const CYAN = PALETTE.engineering;
const AMBER = PALETTE.security;
const DARK = PALETTE.background;
const DARK_WARM = "#0d0906";

export const SCENE_KEYFRAMES: Record<SceneSectionId, SceneKeyframe> = {
  top: {
    camera: { position: [3.1, 2.35, 3.55], target: [0, 0, 0], fov: 32 },
    key: { color: CYAN, intensity: 1.4 },
    accentA: { color: CYAN, intensity: 1.2 },
    accentB: { color: AMBER, intensity: 0 },
    fog: { color: DARK, near: 7, far: 20 },
    model: { position: [1.35, 0, -0.55], rotationBias: 0, scale: 0.88 },
  },
  about: {
    camera: { position: [-2.4, 1.6, 4.2], target: [-1, 0.2, 0], fov: 30 },
    key: { color: CYAN, intensity: 1.0 },
    accentA: { color: CYAN, intensity: 0.6 },
    accentB: { color: AMBER, intensity: 0 },
    fog: { color: DARK, near: 5, far: 15 },
    model: { position: [-1.4, 0.1, -0.6], rotationBias: 0.7, scale: 0.9 },
  },
  capabilities: {
    camera: { position: [0, 1.2, 5.5], target: [0, 0, 0], fov: 34 },
    key: { color: CYAN, intensity: 0.9 },
    accentA: { color: CYAN, intensity: 1.1 },
    accentB: { color: AMBER, intensity: 1.1 },
    fog: { color: DARK, near: 5, far: 15 },
    model: { position: [0, 0, -1.6], rotationBias: 1.3, scale: 0.75 },
  },
  toolbox: {
    camera: { position: [1.8, 2.6, 6.5], target: [0, 0, -1], fov: 38 },
    key: { color: CYAN, intensity: 0.55 },
    accentA: { color: CYAN, intensity: 0.5 },
    accentB: { color: AMBER, intensity: 0 },
    fog: { color: DARK, near: 4, far: 12 },
    model: { position: [1.6, 0.2, -2.4], rotationBias: 2.0, scale: 0.65 },
  },
  work: {
    camera: { position: [-1.5, 1.0, 8.5], target: [0, -0.4, -2], fov: 40 },
    key: { color: CYAN, intensity: 0.3 },
    accentA: { color: CYAN, intensity: 0.2 },
    accentB: { color: AMBER, intensity: 0 },
    fog: { color: DARK, near: 4, far: 11 },
    model: { position: [-2.5, -0.3, -3], rotationBias: 2.6, scale: 0.4 },
  },
  security: {
    camera: { position: [1.6, 1.1, 4.2], target: [1.0, 0.15, -0.6], fov: 30 },
    key: { color: AMBER, intensity: 1.6 },
    accentA: { color: AMBER, intensity: 1.4 },
    accentB: { color: CYAN, intensity: 0 },
    fog: { color: DARK_WARM, near: 3, far: 10 },
    model: { position: [2.2, 0.3, -1.4], rotationBias: 3.4, scale: 0.55 },
  },
  method: {
    camera: { position: [2.2, 1.4, 5.0], target: [0.8, 0, -1.8], fov: 34 },
    key: { color: CYAN, intensity: 0.9 },
    accentA: { color: CYAN, intensity: 0.8 },
    accentB: { color: AMBER, intensity: 0 },
    fog: { color: DARK, near: 5, far: 13 },
    model: { position: [2.6, 0.2, -3.2], rotationBias: 4.2, scale: 0.42 },
  },
  contact: {
    camera: { position: [2.4, 1.8, 4.4], target: [-0.8, 0, -1], fov: 34 },
    key: { color: CYAN, intensity: 1.0 },
    accentA: { color: AMBER, intensity: 0.4 },
    accentB: { color: CYAN, intensity: 0 },
    fog: { color: DARK, near: 5, far: 15 },
    model: { position: [-2.2, -0.1, -2.6], rotationBias: 5.0, scale: 0.5 },
  },
};
