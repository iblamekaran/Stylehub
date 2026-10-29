# StyleHub: React Integration Guide

## What the project was like before React

StyleHub was a static, multi-page storefront made with HTML, CSS, and vanilla
JavaScript. The four pages were `index.html`, `about.html`, `account.html`, and
`checkout.html`.

The JavaScript in `script.js` handled the interactive features directly:

- It created product cards by building and inserting HTML into the catalog.
- It attached event listeners for product details and adding items to the bag.
- It updated the bag, checkout summary, product modal, and review lists by
  changing the document.
- It handled account forms, saved addresses, wallet balance, and order history.
- It stored the bag, accounts, and submitted reviews in browser `localStorage`.

This approach worked for the original project. As the catalog UI gained search,
filters, and individual quantity controls, manually changing the DOM for every
catalog interaction became less convenient to extend and maintain.

## What changed when React was added

React was added to the **catalog on the home page**, not to every feature or
page. The catalog is now rendered from product data as React components:

- **`ProductCatalog`** displays the catalog controls and the currently visible
  products.
- **`ProductCard`** displays one product and receives its product information
  and event handlers through props.
- **Props** pass each card its product, rating, review count, and callbacks for
  opening details or adding to the bag.
- **`useState`** stores the search text, selected collection, and each card's
  quantity.
- **`useMemo`** derives the list of products matching the current search and
  collection.
- React updates the catalog when this component state changes. The filter,
  search, and quantity interactions do not require manually rebuilding the
  catalog DOM.

The product details modal and shopping bag continue to use the existing
JavaScript behavior. React calls those existing functions when a customer opens
a product or adds an item.

### Before and after

| Area | Before React | After React |
|---|---|---|
| Catalog rendering | Vanilla JavaScript manually built and inserted product-card HTML. | React renders `ProductCard` components from the product list. |
| Product-card behavior | Shared DOM event handling read the quantity input and product ID. | Each card has its own quantity state and receives callbacks through props. |
| Search and filters | Not part of the original catalog. | React state filters products by collection and search text. |
| Product details and reviews | Handled by `script.js`. | Still handled by `script.js`; React calls the existing modal function. |
| Bag and checkout | Handled by `script.js` and browser `localStorage`. | Still handled by `script.js`; React hands additions to the existing bag function. |
| Account and about pages | Static HTML with shared vanilla JavaScript behavior. | Still separate HTML pages; they do not mount React components. |
| Styling | CSS. | Still CSS. The luxury-inspired visual redesign was made in `style.css`, not automatically by React. |
| Development/build setup | Open the static HTML files directly; no npm scripts were configured. | React is installed locally, and Vite provides `npm run dev`, `npm run build`, and `npm run preview`. |

## What remained the same

- The project is still a **multi-page website**, not a single-page React rewrite.
- The same six products, product images, prices, and reviews are used.
- The existing product detail gallery, review submission, bag drawer, checkout,
  account forms, wallet, saved address, and order history remain in
  `script.js`.
- The existing shopping data continues to use browser `localStorage`.
- The site's markup and styling continue to use HTML and CSS. React renders the
  catalog's changing content; it does not replace the stylesheet or all page
  structure.

In short: React changed how the home-page catalog is composed and how its
interactive search, filters, and per-product quantity are managed. It did not
replace the rest of the storefront.

## Why use React here?

React is useful when a part of a page changes in response to user input. For the
catalog, it gives the project a direct way to:

1. Reuse one product-card component for every product.
2. Keep related UI state with the component that uses it (for example, each
   card's quantity).
3. Keep search and filter controls synchronized with the visible product list.
4. Pass product data and actions explicitly through component props.
5. Add future catalog interactions without manually clearing and recreating
   each card in the DOM.

React was not strictly required for the original storefront. Vanilla JavaScript
could also implement these features. React was added to demonstrate and use
components, props, and hooks in the catalog while leaving the existing account,
bag, and checkout functionality intact.

## Files and responsibilities

- **`catalog.jsx`** — React `ProductCatalog` and `ProductCard` components, their
  props and hooks, and the React root mounted into `#productGrid`.
- **`script.js`** — Existing storefront logic and shared product data. It
  exposes selected catalog operations through `window.StyleHub` so the React
  catalog can use the existing modal and bag behavior.
- **`index.html`** — Includes the catalog mount element and loads `catalog.jsx`
  as a JavaScript module.
- **`about.html`, `account.html`, `checkout.html`** — Existing separate pages;
  they load the shared `script.js` module.
- **`style.css`** — Shared layout, original storefront styling, and the newer
  luxury-inspired responsive design.
- **`package.json` / `package-lock.json`** — Local React, React DOM, and Vite
  dependencies and repeatable npm scripts.
- **`vite.config.js`** — Tells Vite to build all four HTML pages.
- **`.gitignore`** — Excludes installed dependencies and generated build output.
- **`node_modules/`** — Locally installed packages; generated by `npm install`
  and not intended to be committed.
- **`dist/`** — Production build output; generated by `npm run build`.

## Running the project

Open PowerShell in the project folder. Install dependencies once (and again
after a fresh clone or when the lockfile changes):

```powershell
npm install
```

Start the local development server:

```powershell
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173/`. Open that URL in
your browser. Keep the terminal running while you use the development site.

Create and test a production build:

```powershell
npm run build
npm run preview
```

`npm run build` writes the production-ready site to `dist/`. `npm run preview`
serves that built output locally.

## Important distinction

The visual redesign and React integration are related project updates, but they
are separate changes: **React provides the catalog components and state
management; `style.css` provides the colors, typography, spacing, and layout.**
The rest of the site's interactions remain in the existing vanilla JavaScript
until they are intentionally migrated to React.
