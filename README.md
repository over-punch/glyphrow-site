# glyphrow.com

The site behind [glyphrow.com](https://glyphrow.com): an explanation of the
[`glyphrow`](https://www.npmjs.com/package/glyphrow) type-tester library, a live
variable-font hero, and an **infinite scroll of Google Fonts** where every row
is a real Glyphrow tester cycling through different settings.

> The library itself lives at **[quitequinn/glyphrow](https://github.com/quitequinn/glyphrow)**.
> This repo is just the marketing/showcase site, hosted on Vercel under Liiift.

## Stack

- Next.js (App Router), React 18
- Consumes the published `glyphrow` package (`glyphrow` + `glyphrow/react` + `glyphrow/styles.css`)
- Google Fonts loaded lazily per row as the scroll advances (no API key)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy (Vercel)

- **Root Directory:** repo root (`./`)
- **Framework preset:** Next.js (set in `vercel.json`)
- Team: `liiift` · Domain: `glyphrow.com`

## Layout

- `app/` — layout, page, global styles
- `components/Hero.tsx` — the wordmark, a live Glyphrow of Fraunces (variable)
- `components/FontScroll.tsx` — the infinite Google-Fonts scroll
- `lib/families.ts` — curated Google Fonts list (the scroll loops it)
- `lib/presets.ts` — the settings cycled across rows
- `lib/googleFont.ts` — lazy per-family stylesheet loader
