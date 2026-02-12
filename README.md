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

- Portfolio entries (one file per project with front matter): `src/portfolio/<category>/*.md`
- Portfolio category metadata: `src/portfolio/<category>/<category>.11tydata.js`
- Portfolio images (colocated with entries): `src/portfolio/<category>/*.{jpg,png,...}`
