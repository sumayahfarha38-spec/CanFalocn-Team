# CanFalcon Website

Cinematic scroll-driven website for the CanFalcon CanSat mission (Bahrain, 2026).
Built with Vite, React, Tailwind CSS and Framer Motion.

## Requirements
- Node.js 18 or newer (20+ recommended)

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
```

## Production build
```bash
npm run build    # outputs to dist/
npm run preview  # serve the build locally
```

## Deploy on Vercel
1. Push this folder to a GitHub repository (`git init`, `git add .`, `git commit`, `git push`).
2. In Vercel choose **Add New → Project**, import the repository.
3. Vercel detects Vite. Keep: Build Command `npm run build`, Output Directory `dist`. Click **Deploy**.

(Alternative: `npm i -g vercel`, then run `vercel` in this folder, and `vercel --prod`.)

## Connect your own domain
1. Vercel project → **Settings → Domains → Add**, enter your domain.
2. At your domain registrar add the DNS records Vercel shows (usually an `A` record to `76.76.21.21` for the root domain and a `CNAME` to `cname.vercel-dns.com` for `www`; use the exact values Vercel displays).
3. Wait for DNS to propagate. HTTPS is issued automatically.

## Project structure
```
index.html            page shell, fonts, favicon
public/logo.png       CanFalcon logo (transparent)
public/skyline.jpg    Bahrain Bay photo used in the opening sequence
public/favicon.svg
src/main.jsx          entry
src/App.jsx           scroll-linked scene (camera, rooftop release, descent)
src/components.jsx    Reveal, Sec, Chart, CanSat, Chute
src/data.js           content: parts, team, nav, asset paths
src/index.css         Tailwind + base styles
```

## Notes
- All data shown is placeholder or illustrative. The rooftop release is a visual representation, not a claim about flight conditions or release height. Replace placeholders once real flight data exists.
- Fonts (Inter, Space Grotesk) load from Google Fonts.
- To swap images, replace the files in `public/` keeping the same names.
