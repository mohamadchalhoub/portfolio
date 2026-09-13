# Mohamad Chalhoub — Portfolio

A Next.js (App Router) portfolio with a full-page cinematic scroll
experience — a hand-built "orbital core" model (Blender + React Three
Fiber) choreographed by GSAP ScrollTrigger as you scroll through every
section — plus a working RAG chatbot and contact form.

## Where the real content lives

All factual, editable copy is centralized under `content/`, typed and
imported by the section components in `components/sections/` — nothing in
those components should need real facts hardcoded into JSX:

| File | Drives |
| --- | --- |
| `content/site.ts` | Public name, title/description, LinkedIn, navigation, and the shared color `PALETTE` |
| `content/about.ts` | About section — **`bio` ships as a placeholder** (see the `TODO(Mohamad)` comment in the file); replace it with your own words |
| `content/capabilities.ts` | The capability pillars (Software Engineering, Cybersecurity) |
| `content/toolbox.ts` | The grouped technical toolbox |
| `content/projects.ts` | Selected Work project data (the full case-study fields aren't all rendered — the gallery card is intentionally lean — but stay available for future use) |
| `content/security.ts` | Security Research section copy |
| `content/process.ts` | Working Method steps |

Education and certifications are intentionally **not** included yet — the
CV had conflicting/ambiguous entries for both, so nothing was guessed at.
Add a `content/education.ts` / `content/certifications.ts` plus matching
sections once that data is confirmed. The site is scoped to development and
security work only — no networking-focused content or an experience
timeline.

## The 3D experience

`public/models/orbital-core.glb` — a fractured armor shell around a glowing
energy core, ringed by tethered satellite modules, drifting shards, and two
tilted orbit rings — is generated from `blender/build-orbital-core.py`, a
procedural Blender Python script, not a hand-sculpted file, so it's fully
reproducible. To rebuild it after editing the script:

```bash
blender --background --python blender/build-orbital-core.py
```

`blender/render-preview.py` renders a quick preview PNG (`blender/preview.png`)
for checking changes without opening the web app.

The model is loaded once, in `components/three/OrbitalCoreModel.tsx`, and
rendered inside a single fixed `<Canvas>` (`components/experience/Experience.tsx`)
that stays mounted behind every section on the page. GSAP ScrollTrigger
(`components/experience/useScrollScenes.ts`) drives one continuous camera/
lighting/model choreography keyed to each section's real DOM position — see
`components/experience/scroll-scenes.ts` for the per-section keyframes. Under
`prefers-reduced-motion` the whole layer never mounts (`components/three/HeroVisual.tsx`
falls back to a static SVG instead).

## Running the project

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build + type-check
```

Copy `.env.local.example` to `.env.local` and fill in the chatbot/RAG and
contact-form (Resend) environment variables — see `CHATBOT_SETUP.md`,
`RAG_SETUP.md` and `ENHANCED_RAG_GUIDE.md` for details on those two
subsystems specifically.
