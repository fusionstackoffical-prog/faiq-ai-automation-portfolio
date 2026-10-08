# FAIQ. — AI Automation & AI Agents

Existing Next.js App Router portfolio for Muhammad Faiq Khan. Uses React, TypeScript, GSAP and Lucide. The supplied portrait is preserved.

## Development

Node.js 20.9+ is required. Run `npm install`, then `npm run dev`. The dev server binds to 127.0.0.1:3000. If an instance is already running, reuse it.

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run start`

## Design and content

The visual system uses layered near-black (#050505, #090909), graphite surfaces (#0D0D0D, #111111, #171717), soft-white typography (#F5F5F2) and restrained silver illumination. Self-hosted Cormorant Garamond supplies the editorial display type; Space Grotesk and IBM Plex Mono serve body copy and technical labels.

- `src/app/page.tsx`: section composition, with About immediately after Hero.
- `src/app/globals.css`: responsive design system and reduced-motion styles.
- `src/lib/content.ts`: identity, contact destinations, services and journey copy.
- `src/lib/architecture.ts`: 33 nodes, 38 connections and the demonstration signal route.
- `src/components/architecture.tsx`: keyboard/touch explorable HVAC map with zoom, pause and node descriptions.
- `src/components/technology-map.tsx`: responsive connector geometry measured from the tool nodes.
- `src/components/service-diagram.tsx`: changing service preview.
- `src/sections/voice.tsx`: customer request-to-action walkthrough; the former call transcript is removed.
- `src/sections/featured.tsx`: real-system architecture case study; the former fake booking simulation is removed.
- `src/sections/engine.tsx`: unpinned, scroll-linked customer data journey with manual node selection.
- `src/animations/motion.tsx`: restrained GSAP reveals and hero parallax.

## Contact and integrations

Primary project CTAs, Let's Talk, the contact icon and the phone link open WhatsApp for +92 319 9463735 with a short prefilled project enquiry. LinkedIn and Instagram use the supplied profile URLs. External profile/contact links use a new tab with `noopener noreferrer`. Email links remain available.

The architecture is a stylized, interactive interpretation of the supplied real n8n canvas and written project information. It is not a live n8n connection, exact workflow export or claim of measured client results. No booking is made, customer record updated or message sent by the visualization. The reference screenshot is not embedded in the website.

## Accessibility and motion

All interactions have visible keyboard focus. Service and request tabs support arrow keys, Home and End. Architecture nodes expose descriptive accessible names and respond to focus, hover or tap; Escape dismisses node inspection. Narrow layouts give the canvas its own horizontal scroll area so nodes remain legible. The customer journey stacks vertically on smaller screens, without scroll pinning. Reduced-motion preferences disable decorative animation and automatic journey progression. The architecture also has a pause control and only advances its signal while in view.

## Deployment

No deployment is performed. Standard Next.js hosting can use `npm run build`. Configure `NEXT_PUBLIC_SITE_URL` for a custom canonical deployment origin; Vercel production metadata is detected automatically.
