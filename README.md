# StyleHub — Semester Project

StyleHub is a responsive, multi-page clothing storefront built as a frontend
semester project. It demonstrates product discovery and filtering, product
details and reviews, a shopping bag, checkout, and browser-based account
features.

## Features

- Search products and filter by collection in the React-powered catalog.
- View product galleries, ratings, and reviews.
- Add products to a shopping bag and review the checkout summary.
- Explore account forms, saved addresses, wallet balance, and order history.
- Persist storefront data in the browser with `localStorage`.
- Use the same responsive interface across the home, about, account, and
  checkout pages.

This is a frontend demonstration. It does not connect to a backend, process
payments, or provide production account authentication.

## Technology

- React 18
- Vite
- HTML, CSS, and JavaScript

## Run locally

Install Node.js, then run these commands from the project directory:

```powershell
npm ci
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```powershell
npm run build
npm run preview
```

## Pages

- `index.html` — storefront and product catalog
- `about.html` — project/store information
- `account.html` — account and saved shopping data
- `checkout.html` — shopping bag and checkout summary

## Project files

- `catalog.jsx` — React catalog, product cards, search, and collection filters
- `script.js` — shared product data and storefront interactions
- `style.css` — shared responsive styling
- `vite.config.js` — multi-page Vite build configuration
- `images/` — product photography
- `REACT-OVERVIEW.md` — explanation of the React integration
- `FEE2.pdf` — semester-project document
- `StyleHub_College_Format_Final_Collage.pptx` — project presentation

## Project documentation

- [React integration overview](./REACT-OVERVIEW.md)
- [Semester-project document](./FEE2.pdf)
- [Project presentation](./StyleHub_College_Format_Final_Collage.pptx)
