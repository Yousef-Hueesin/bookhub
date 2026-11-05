# BookHub

BookHub is a responsive book-library website built with HTML, CSS, and vanilla JavaScript. Browse the featured collection, search by title or author, filter by category, and add books to your reading list.

## Features

- Responsive layout inspired by the BookHub reference design.
- Search and category filtering for the featured collection.
- Book cards with covers, ratings, review counts, and detail popups.
- An add-book modal with required-field validation.
- An empty-results message when no books match the current filters.

The featured collection includes *Clean Code*, *Atomic Habits*, *The Martian*, *Dune*, and *The 5 AM Club*. Books added through the form are kept in page memory and are cleared when the page is reloaded. The page source files (`index.html`, `script.js`, and `style.css`) are in the repository root.

## Publish with GitHub Pages

The GitHub Actions workflow builds and deploys this site when the page source files or app configuration change on `main`. The expected site address is:

<https://codding-school-mahama-1.github.io/React-First-Project-BookHub/>

In the repository settings, enable **Pages** with **GitHub Actions** as the build and deployment source if it is not already enabled.

## Getting started

From the repository root, enter the app folder and start the Vite development server:

```bash
cd bookhub
npm install
npm run dev
```

Other useful commands, run from `bookhub/`:

| Command | What it does |
| --- | --- |
| `npm run build` | Create the production site in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Check the root `script.js` with ESLint |

## Project files

- `../index.html` — accessible page structure, navigation, book list, and modal dialogs.
- `../style.css` — responsive layout, visual styling, and reduced-motion support.
- `../script.js` — book data, rendering, search, category filtering, ratings, and modal interactions.
- `public/images/` — book cover images served by Vite.
