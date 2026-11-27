# Ecollen Barcelo — Portfolio Plan (v3)

## Purpose
Show UI/UX reviewers and clients a clear, honest picture of Ecollen: an IT student majoring in databases with a growing focus on UI and UX. Every claim on the page comes from real work. Nothing is invented.

## Structure
1. **Hero** — name, role, short bio, internship status, three plain facts (studying, major, also drawn to).
2. **Selected work** — two case studies: the CKD Healthcare Management System (documentation and database design for a school project) and this portfolio (design decisions). Each lists what was made and what was learned.
3. **Certificates** — IT Specialist: Databases (Certiport) and Employability Skills: JobReady (Wadhwani Foundation) with certificate images, plus webinars attended, clearly labelled as participation.
4. **How I work** — three real steps: understand the need, plan the approach, build and refine. Then the tools used.
5. **Contact** — three cards: email opens Gmail compose, phone copies the number, Facebook opens the profile; plus a saved contact card.

## Design system
- **Palette:** monochrome (ink, soft ink, line, paper) with one accent, chartreuse `#C9DC30`, used only as a fill so text always has strong contrast.
- **Themes:** light and dark. Follows the system setting, remembers the visitor's choice, and applies before first paint.
- **Type:** Bricolage Grotesque for headings, DM Sans for text. Both are self-hosted through Fontsource, so the site works offline. Body text is 17px; nothing is smaller than about 14px.
- **Motion:** one hero entrance sequence, a scroll progress bar, and feedback for user actions. Everything is disabled under `prefers-reduced-motion`.
- **Accessibility:** skip link, visible focus, keyboard-operable menu and contact cards, contrast above 4.5:1.

## Files
- `client/src/pages/Home.tsx` — all content and behaviour.
- `client/src/index.css` — tokens, layout, themes.
- `client/index.html` — metadata and the pre-paint theme script.
- `client/public/ecollen-portrait.jpeg` — portrait.
- `client/public/certs/` — certificate images.

## To add next
More UI/UX case studies as they are completed, each with a screenshot, the problem, and what was done.
