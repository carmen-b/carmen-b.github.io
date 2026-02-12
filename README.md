# Carmen Balaban Portfolio

This site now uses [Eleventy](https://www.11ty.dev/) instead of Harp.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The generated static site is written to `dist/`.

## Content Structure

- Portfolio entries (one file per project with front matter): `src/portfolio-items/`
- Portfolio category metadata: `src/_data/portfolioCategories.js`
- Portfolio images (passthrough-copied to `/portfolio/...`): `src/portfolio-assets/`
