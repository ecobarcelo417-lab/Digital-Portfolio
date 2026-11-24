# Ecollen Barcelo — IT & Developer Portfolio Plan

## Product scope and implementation

Upgrade the portfolio by removing the oversized black flip-card hero shown in the user’s screenshot and its “tap to flip” prompt. Replace it with a polished, portrait-led developer introduction: a strong Ecollen Barcelo heading, Information Technology / Developer role, concise user-provided biography, capability-focused message, and direct paths to contact and the capabilities section. Use the user-supplied monochrome portrait as the hero visual. Store the portrait in `client/public/ecollen-portrait.jpeg` and reference it from the site root so it loads both on Manus Preview and in a downloaded local Vite project. Remove the fixed quick-contact dock because it obscures the portrait and capability content at common viewport sizes; move Save contact into the Contact section while retaining direct phone, email, and Facebook actions there.

The initialized React 19 + TypeScript + Vite project remains a static site on port 3000 with no Server or Database. Retain a compact header with anchors to About, Capabilities, and Contact; use a responsive two-column hero that stacks cleanly on mobile; retain the capability, contact, and footer regions. Remove obsolete flip-card and floating-dock state/styles while preserving sharing, vCard generation, and direct contact behavior. Do not invent client work, technologies, credentials, or availability.

## Design system

- **Design Movement:** Editorial portfolio design with a modern developer-journal character: calm, precise, tactile, and confident.
- **Core Principles:** Make identity and purpose immediate; give the supplied portrait meaningful prominence; organize information in a clear scan path; keep email, phone, and Facebook access straightforward.
- **Color Philosophy:** Bright paper and near-black typography create legibility; graphite rules and a restrained dot grid provide tactility; chartreuse remains a small signature accent, while the portrait stays monochrome.
- **Layout Paradigm:** A wide, asymmetrical split hero pairs large type and a concise introduction with an offset portrait composition. At mobile widths it becomes a deliberate vertical sequence. Capabilities remain in compact cards and contact details form the closing section, with no fixed overlay on the content.
- **Signature Elements:** Subtle dot-grid paper; a large monochrome portrait with a thin offset frame and small EB caption; compact chartreuse markers.
- **Interaction Philosophy:** Remove card flipping entirely. Use direct section anchors, a share action with clipboard fallback, an in-flow downloadable vCard button, and direct phone/email links. The Facebook action opens the user-provided URL `https://www.facebook.com/share/1CLUpLvBnf/?mibextid=wwXIfr`.
- **Animation:** Restrained short hover/focus transitions only; no entrance animation or motion-dependent content. Respect `prefers-reduced-motion: reduce`.
- **Typography System:** DM Sans for headings and body text; DM Mono for compact overlines and technical metadata. The heading uses a large, tightly tracked display scale without distorting the name.
- **Brand Essence:** Ecollen’s IT and coding portfolio, distinct through its portrait-led editorial clarity; **capable, practical, focused**.
- **Brand Voice:** First-person, direct, and grounded—example headline: “Code for real needs.” Example invitation: “Let’s build something useful.” Avoid unsupported claims and generic filler.
- **Wordmark & Logo:** Ecollen Barcelo paired with the custom EB monogram and restrained chartreuse accent.
- **Signature Brand Color:** Chartreuse `#C9DC30`, used sparingly for markers and the EB signature.

## Project structure

- `client/src/pages/Home.tsx` — header navigation, portrait-led hero, user-supplied biography, capability cards, contact links, share, in-flow vCard action, and footer.
- `client/src/index.css` — responsive editorial layout, monochrome portrait frame, accessible focus styles, and reduced-motion behavior; remove obsolete flip-card and dock rules.
- `client/public/ecollen-portrait.jpeg` — bundled user-supplied portrait, available to local Vite runs and included in the downloadable project.
- `README.md` — Node/pnpm installation, VS Code startup, localhost preview, and design-file pointers.
- `client/index.html` — Ecollen-specific title and social-preview metadata.
- `client/public/manus-routes.json` — the single route `/`.
- `client/public/site-mark.svg` and `app.config.ts` — EB favicon and durable project-logo URL.
- `plan.md` and `TODO.md` — design decisions and implementation outcomes.

## Dependencies and serving

Reuse the installed React, TypeScript, Vite, Tailwind, and Lucide dependencies. No backend, database, login, or third-party contact service is required for the portfolio preview. Keep the site static on the initialized Preview port 3000; use Vite directly on local port 3000 with the included pnpm lockfile. The route manifest remains synchronized with the sole `/` route.
