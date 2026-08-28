# tools.akil.codes

A single static page listing the tools I built and use. Three files, no build step.

## Preview locally

```bash
python3 -m http.server 4890
```

Then open http://localhost:4890.

## Deploy

Any static host works. The site has no server-side dependencies.

- **Vercel** — `vercel deploy` from this directory, or import the repo in the dashboard.
- **Cloudflare Pages** — connect the repo. Framework preset: None. Build command: empty. Output directory: `.`.
- **Netlify** — drag the folder into the dashboard, or `netlify deploy --dir=.`.

Point `tools.akil.codes` at the deployment using the same DNS flow as any other subdomain.

## Editing tools

Each tool is a plain `<a class="card mark-<key>-card">` in `index.html`. To add or edit one:

1. Copy an existing `.card` block
2. Set `href`, `data-name`, `data-cat`, `data-host`
3. Set the `.card-date`, `.card-name`, `.card-desc`, `.tag`, `.host`
4. Swap the `<svg>` inside `.mark` for the glyph you want
5. If it's a new category, use a new color: add matching `--c-<key>` and `--c-<key>-bg` tokens in `styles.css` and a `.mark-<key>-card { --card-accent: var(--c-<key>) }` line

## Live status dots

Each hostname next to a card gets a small dot: green when reachable, red when unreachable, grey while pending. The check is a `no-cors` fetch to the origin at page load, so it doesn't require CORS headers or a status endpoint. `main.js` also updates the "N LIVE" count in "The shelf" once all pings resolve.

## Design notes

- System font stack (`SF Pro` on Mac, `Segoe UI` on Windows). No web fonts.
- Warm cream (`#f8f7f4`) in light mode, warm ink (`#0d0c0a`) in dark. Not clinical.
- Hairline borders using `rgba` so they read consistently in both themes.
- One accent = ink itself; hover on a card pulls that tool's mark color into the arrow.
- Grid uses a single `1px` gap on a bordered container, which reads as one hairline-divided object instead of six floating tiles.
- No hero animations, no search, no filters — a launcher at this scale doesn't need them.
- Responsive; the grid collapses to one column under 640px.
