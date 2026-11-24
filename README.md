# Ecollen Barcelo — IT & Developer Portfolio

This is the complete source project for Ecollen Barcelo’s responsive portfolio. The portrait is included locally at `client/public/ecollen-portrait.jpeg`, so it works in VS Code localhost previews without relying on Manus storage or an internet connection for the image.

## Run locally in VS Code

1. Install Node.js 22 LTS (which includes Corepack) from [nodejs.org](https://nodejs.org/).
2. Extract the ZIP and open the extracted project folder in VS Code. Open **Terminal → New Terminal** in VS Code.
3. From the project root—the folder containing `package.json`—run:

   ```sh
   corepack enable
   corepack prepare pnpm@10.18.0 --activate
   pnpm install
   pnpm exec vite --host 127.0.0.1 --port 3000 --strictPort
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser. Keep the terminal running while you use the preview; press `Ctrl+C` in that terminal to stop it.

If port 3000 is already in use, close the other local server using it before starting this one.

## Continue designing

- Main page content and contact links: `client/src/pages/Home.tsx`
- Page styling and responsive layout: `client/src/index.css`
- Portrait image: `client/public/ecollen-portrait.jpeg`

Vite serves files in `client/public` from the website root. For example, the portrait is referenced in code as `/ecollen-portrait.jpeg`. To use another picture, replace that file while keeping the same name, or update both the image path in `Home.tsx` and the filename in `client/public`.

## Useful commands

```sh
pnpm check       # TypeScript check
pnpm build:static # Production static site build
```

The project uses React, TypeScript, Vite, and pnpm. The local preview is only available on your own computer; it does not publish the site to the internet.
