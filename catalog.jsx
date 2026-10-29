import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./script.js";

function ProductCard({ product, rating, reviewCount, onOpen, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  function handleCardClick(event) {
    if (event.target.closest("button, input")) return;
    onOpen(product.id);
  }

  function handleAdd(event) {
    event.stopPropagation();
    onAdd(product.id, Math.max(1, Number.parseInt(quantity, 10) || 1));
  }

  return (
    <article className="product-card" onClick={handleCardClick}>
      <button
        className="product-image-button"
        type="button"
        onClick={() => onOpen(product.id)}
        aria-label={`View ${product.name}`}
      >
        <img
          className="product-swatch"
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
        />
        <span className="product-collection">{product.collection}</span>
        <span className="quick-view">Discover piece <span aria-hidden="true">↗</span></span>
      </button>
      <div className="product-body">
        <div className="product-title-row">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-price">{window.StyleHub.formatPrice(product.price)}</span>
        </div>
        <p className="product-meta">{product.meta}</p>
        <div className="mini-rating" aria-label={`${rating.toFixed(1)} out of 5, ${reviewCount} reviews`}>
          <span className="stars" aria-hidden="true">{"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}</span>
          <span className="rating-count">{rating.toFixed(1)} ({reviewCount})</span>
        </div>
        <div className="product-actions">
          <label className="quantity-label">
            <span className="sr-only">Quantity for {product.name}</span>
            <input
              type="number"
              className="qty-input"
              min="1"
              max="99"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              onClick={(event) => event.stopPropagation()}
              aria-label={`Quantity for ${product.name}`}
            />
          </label>
          <button className="btn btn-primary add-btn" type="button" onClick={handleAdd}>
            Add to bag <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductCatalog({ products }) {
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState("All pieces");
  const collections = ["All pieces", ...new Set(products.map((product) => product.collection))];

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCollection = collection === "All pieces" || product.collection === collection;
      const matchesSearch = !query || `${product.name} ${product.meta} ${product.collection}`
        .toLowerCase()
        .includes(query);
      return matchesCollection && matchesSearch;
    });
  }, [products, search, collection]);

  return (
    <>
      <div className="catalog-controls">
        <div className="collection-filters" role="group" aria-label="Filter by collection">
          {collections.map((item) => (
            <button
              key={item}
              className={`filter-chip${collection === item ? " active" : ""}`}
              type="button"
              onClick={() => setCollection(item)}
              aria-pressed={collection === item}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search the collection</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find your piece"
          />
        </label>
      </div>
      <div className="catalog-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            rating={window.StyleHub.getAverageRating(product.id)}
            reviewCount={window.StyleHub.getReviews(product.id).length}
            onOpen={window.StyleHub.openProductModal}
            onAdd={(productId, quantity) => {
              window.StyleHub.addToCart(productId, quantity);
              window.StyleHub.openCart();
            }}
          />
        ))}
      </div>
      {visibleProducts.length === 0 && (
        <p className="catalog-empty">No pieces found. Try another search or collection.</p>
      )}
      <p className="catalog-count">
        Showing {visibleProducts.length} of {products.length} considered pieces
      </p>
    </>
  );
}

const productGrid = document.getElementById("productGrid");
if (productGrid) {
  const catalogRoot = createRoot(productGrid);
  const renderCatalog = () => catalogRoot.render(<ProductCatalog products={window.StyleHub.products} />);
  window.StyleHub.refreshCatalog = renderCatalog;
  renderCatalog();
}
