# Days of School

A small static web app that counts how many school days are left in a school year.

Run it locally with:

```sh
npm install
npm run dev
```

Build the production site with:

```sh
npm run build
```

Run the quality checks with:

```sh
npm run check
```

Deploy the generated `dist/` directory, not the repository root. The root
`index.html` is for Vite during development and loads `src/main.jsx`; a static
host will serve that JSX file with the wrong MIME type. The production
`dist/index.html` points at compiled JavaScript in `dist/assets/`.

For Cloudflare Pages, use the React/Vite preset or these build settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave blank unless the repo is inside a monorepo

If you deploy manually through Cloudflare Direct Upload or Wrangler, run
`npm run build` locally and upload/deploy the `dist/` directory.

Features:

- Reads the school year, school hours and days off from `school-config.js`.
- Counts only configured school weekdays during configured school hours.
- Excludes holidays, breaks, and PA days.
- Updates the countdown every second.
- Shows a full-screen scrolling school calendar.

Edit `school-config.js` to change the calendar.
