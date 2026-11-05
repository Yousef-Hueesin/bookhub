# BookHub

BookHub is a responsive book-library website built with HTML, CSS, and vanilla JavaScript, served and built with Vite. Browse the featured collection, search by title or author, filter by category, open book details, and add books to your reading list.

## Features

- Responsive layout inspired by the BookHub reference design.
- Search and category filtering for the featured collection.
- Book cards with covers, ratings, review counts, and detail popups.
- An add-book modal with required-field validation.
- An empty-results message when no books match the current filters.

The featured collection includes *Clean Code*, *Atomic Habits*, *The Martian*, *Dune*, and *The 5 AM Club*. Books added through the form are kept in page memory and are cleared when the page is reloaded.

## Getting started

Run these commands from the repository root:

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production site in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Check `script.js` with ESLint |

## Project files

- `index.html` — accessible page structure, navigation, book list, and modal dialogs.
- `style.css` — responsive layout, visual styling, and reduced-motion support.
- `script.js` — book data, rendering, search, category filtering, ratings, and modal interactions.
- `public/images/` — book covers and the hero illustration.
- `vite.config.js` — Vite configuration with the `/bookhub/` deployment base.

## Publish with GitHub Pages

The GitHub Actions workflow builds and deploys this site when changes are pushed to `main`, or when manually started with `workflow_dispatch`. Enable **GitHub Actions** as the source in **Settings → Pages**.

The published site is expected at <https://yousef-hueesin.github.io/bookhub/>.
