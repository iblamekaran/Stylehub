
const products = [
  {
    id: "p1", name: "Ochre Field Jacket", price: 2499, meta: "Cotton twill · Unisex",
    collection: "Layers",
    images: ["images/p1-1.jpg", "images/p1-2.jpg", "images/p1-3.jpg", "images/p1-4.jpg", "images/p1-5.jpg", "images/p1-6.jpg", "images/p1-7.jpg"],
    reviews: [
      { name: "Ananya", rating: 5, comment: "Fits true to size and the twill holds up well after washing.", date: "2026-08-02" },
      { name: "Rohit", rating: 4, comment: "Great jacket, sleeves run slightly long for me.", date: "2026-08-14" },
    ],
  },
  {
    id: "p2", name: "Maroon Wrap Shirt", price: 1299, meta: "Poplin · Regular fit",
    collection: "Everyday",
    images: ["images/p2-1.jpg", "images/p2-2.jpg", "images/p2-3.jpg", "images/p2-4.jpg", "images/p2-5.jpg"],
    reviews: [
      { name: "Meera", rating: 5, comment: "Lovely color, doesn't fade after a few washes.", date: "2026-07-28" },
    ],
  },
  {
    id: "p3", name: "Charcoal Trouser", price: 1799, meta: "Straight leg · Cotton",
    collection: "Everyday",
    images: ["images/p3-1.jpg", "images/p3-2.jpg", "images/p3-3.jpg", "images/p3-4.jpg", "images/p3-5.jpg", "images/p3-6.jpg", "images/p3-7.jpg"],
    reviews: [
      { name: "Karan", rating: 4, comment: "Comfortable for all-day wear, good stitching.", date: "2026-08-05" },
      { name: "Divya", rating: 3, comment: "Nice fabric but runs a little tight at the waist.", date: "2026-08-20" },
    ],
  },
  {
    id: "p4", name: "Sand Linen Kurta", price: 1599, meta: "Linen blend · Loose",
    collection: "Natural fibres",
    images: ["images/p4-1.jpg", "images/p4-2.jpg", "images/p4-3.jpg", "images/p4-4.jpg", "images/p4-5.jpg"],
    reviews: [
      { name: "Priya", rating: 5, comment: "Breathable and light, perfect for warm days.", date: "2026-08-10" },
    ],
  },
  {
    id: "p5", name: "Ink Denim Jacket", price: 2899, meta: "Rigid denim · Boxy",
    collection: "Layers",
    images: ["images/p5-1.jpg", "images/p5-2.jpg", "images/p5-3.jpg", "images/p5-4.jpg", "images/p5-5.jpg"],
    reviews: [
      { name: "Arjun", rating: 4, comment: "Solid denim weight, softens up nicely after a wash.", date: "2026-08-01" },
    ],
  },
  {
    id: "p6", name: "Clay Midi Dress", price: 2199, meta: "Rayon · A-line",
    collection: "Natural fibres",
    images: ["images/p6-1.jpg", "images/p6-2.jpg", "images/p6-3.jpg"],
    reviews: [
      { name: "Sana", rating: 5, comment: "Flattering cut and the color is even nicer in person.", date: "2026-08-18" },
      { name: "Ritu", rating: 4, comment: "Good quality, wish it came in more lengths.", date: "2026-08-22" },
    ],
  },
];


let cart = loadCart();

function loadCart() {
  try {
    const saved = localStorage.getItem("stylehub-cart");
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    return {};
  }
}

function saveCart() {
  localStorage.setItem("stylehub-cart", JSON.stringify(cart));
}


function formatPrice(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}


function addToCart(productId, quantity) {
  if (cart[productId]) {
    cart[productId] += quantity;
  } else {
    cart[productId] = quantity;
  }
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  saveCart();
  renderCart();
}

function getCartEntries() {
  return Object.entries(cart).map(([id, qty]) => {
    const product = products.find((p) => p.id === id);
    return { ...product, quantity: qty, lineTotal: product.price * qty };
  });
}

function getCartTotal() {
  return getCartEntries().reduce((sum, entry) => sum + entry.lineTotal, 0);
}

function getCartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}


const cartItemsEl   = document.getElementById("cartItems");
const cartTotalEl   = document.getElementById("cartTotal");
const cartCountEl   = document.getElementById("cartCount");
const summaryListEl = document.getElementById("summaryList");
const summaryTotalEl = document.getElementById("summaryTotal");

function renderCart() {
  const entries = getCartEntries();
  const total   = getCartTotal();

  if (cartCountEl)    cartCountEl.textContent  = getCartCount();
  if (cartTotalEl)    cartTotalEl.textContent   = formatPrice(total);
  if (summaryTotalEl) summaryTotalEl.textContent = formatPrice(total);

  if (entries.length === 0) {
    if (cartItemsEl)   cartItemsEl.innerHTML   = `<li class="empty-msg">Your bag is empty.</li>`;
    if (summaryListEl) summaryListEl.innerHTML  = `<li class="empty-msg">Your bag is empty. Add something from the catalog.</li>`;
    return;
  }

  if (cartItemsEl) {
    cartItemsEl.innerHTML = entries.map((entry) => `
      <li class="cart-item">
        <div>
          <div class="cart-item-name">${entry.name}</div>
          <div class="cart-item-meta">Qty ${entry.quantity} · ${formatPrice(entry.price)} each</div>
          <button class="cart-item-remove" data-id="${entry.id}">Remove</button>
        </div>
        <div>${formatPrice(entry.lineTotal)}</div>
      </li>
    `).join("");
  }

  if (summaryListEl) {
    summaryListEl.innerHTML = entries.map((entry) => `
      <li>
        <span>${entry.name} × ${entry.quantity}</span>
        <span>${formatPrice(entry.lineTotal)}</span>
      </li>
    `).join("");
  }
}

if (cartItemsEl) {
  cartItemsEl.addEventListener("click", (event) => {
    const button = event.target.closest(".cart-item-remove");
    if (!button) return;
    removeFromCart(button.dataset.id);
  });
}


const cartDrawer  = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartToggle  = document.getElementById("cartToggle");
const cartClose   = document.getElementById("cartClose");
const goToCheckout = document.getElementById("goToCheckout");

function openCart() {
  if (cartDrawer)  cartDrawer.classList.add("open");
  if (cartOverlay) cartOverlay.classList.add("open");
  if (cartToggle)  cartToggle.setAttribute("aria-expanded", "true");
}

function closeCart() {
  if (cartDrawer)  cartDrawer.classList.remove("open");
  if (cartOverlay) cartOverlay.classList.remove("open");
  if (cartToggle)  cartToggle.setAttribute("aria-expanded", "false");
}

if (cartToggle) {
  cartToggle.addEventListener("click", () => {
    cartDrawer.classList.contains("open") ? closeCart() : openCart();
  });
}
if (cartClose)    cartClose.addEventListener("click", closeCart);
if (cartOverlay)  cartOverlay.addEventListener("click", closeCart);
if (goToCheckout) goToCheckout.addEventListener("click", closeCart);


const checkoutForm  = document.getElementById("checkoutForm");
const formStatus    = document.getElementById("formStatus");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const paymentSelect = document.getElementById("payment");
const walletHint    = document.getElementById("walletHint");

if (paymentSelect) paymentSelect.addEventListener("change", updateWalletHint);

function updateWalletHint() {
  const user = getCurrentUser();
  if (paymentSelect && walletHint) {
    if (paymentSelect.value === "wallet" && user) {
      walletHint.textContent = `Wallet balance: ${formatPrice(user.wallet)}`;
    } else {
      walletHint.textContent = "";
    }
  }
}

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (getCartCount() === 0) {
      showStatus("Your bag is empty. Add a product before checking out.", "error");
      return;
    }

    if (!checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();
      return;
    }

    const formData = new FormData(checkoutForm);
    const customer = Object.fromEntries(formData.entries());
    const total    = getCartTotal();
    const user     = getCurrentUser();

    if (customer.payment === "wallet") {
      if (!user) {
        showStatus("Log in to pay with your StyleHub wallet.", "error");
        return;
      }
      if (user.wallet < total) {
        showStatus(`Wallet balance (${formatPrice(user.wallet)}) is less than the order total.`, "error");
        return;
      }
      user.wallet -= total;
    }

    const order = {
      customer,
      items: getCartEntries(),
      total,
      placedAt: new Date().toISOString(),
    };

    console.log("Order placed:", order);

    if (user) {
      user.orders.unshift(order);
      user.address = {
        savedAddress: customer.address,
        savedCity:    customer.city,
        savedPincode: customer.pincode,
      };
      saveUsers();
      renderAccountPanel();
    }

    showStatus(`Order placed! ${getCartCount()} item(s) will be delivered to ${order.customer.city}.`, "success");

    cart = {};
    saveCart();
    renderCart();
    checkoutForm.reset();
    updateWalletHint();
  });
}

function showStatus(message, type) {
  if (formStatus) {
    formStatus.textContent = message;
    formStatus.className   = `form-status ${type}`;
  }
}


function getUsers() {
  try {
    const saved = localStorage.getItem("stylehub-users");
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    return {};
  }
}

function saveUsers() {
  const users   = getUsers();
  const current = getCurrentUsername();
  if (current && currentUserRef) {
    users[current] = currentUserRef;
  }
  localStorage.setItem("stylehub-users", JSON.stringify(users));
}

function getCurrentUsername() {
  return localStorage.getItem("stylehub-current-user");
}

function setCurrentUsername(username) {
  localStorage.setItem("stylehub-current-user", username);
}

function clearCurrentUsername() {
  localStorage.removeItem("stylehub-current-user");
}

let currentUserRef = null;

function getCurrentUser() {
  const username = getCurrentUsername();
  if (!username) return null;
  const users    = getUsers();
  currentUserRef = users[username] || null;
  return currentUserRef;
}


const accountStatus = document.getElementById("accountStatus");
const authPanel     = document.getElementById("authPanel");
const accountPanel  = document.getElementById("accountPanel");

const tabLogin    = document.getElementById("tabLogin");
const tabSignup   = document.getElementById("tabSignup");
const loginForm   = document.getElementById("loginForm");
const signupForm  = document.getElementById("signupForm");
const loginStatus = document.getElementById("loginStatus");
const signupStatus = document.getElementById("signupStatus");

const walletBalanceEl = document.getElementById("walletBalance");
const topUpAmount     = document.getElementById("topUpAmount");
const topUpBtn        = document.getElementById("topUpBtn");
const addressForm     = document.getElementById("addressForm");
const addressStatus   = document.getElementById("addressStatus");
const ordersList      = document.getElementById("ordersList");
const logoutBtn       = document.getElementById("logoutBtn");
const headerLogout    = document.getElementById("headerLogout");


if (tabLogin) {
  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  });
}

if (tabSignup) {
  tabSignup.addEventListener("click", () => {
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  });
}


if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value;
    const users    = getUsers();

    if (users[username]) {
      signupStatus.textContent = "That username is already taken. Try logging in instead.";
      signupStatus.className   = "form-status error";
      return;
    }

    users[username] = {
      password,
      wallet:  1000,
      address: { savedAddress: "", savedCity: "", savedPincode: "" },
      orders:  [],
    };
    localStorage.setItem("stylehub-users", JSON.stringify(users));

    setCurrentUsername(username);
    signupForm.reset();
    signupStatus.textContent = "";
    loadAccount();
  });
}


if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const users    = getUsers();
    const user     = users[username];

    if (!user || user.password !== password) {
      loginStatus.textContent = "Incorrect username or password.";
      loginStatus.className   = "form-status error";
      return;
    }

    setCurrentUsername(username);
    loginForm.reset();
    loginStatus.textContent = "";
    loadAccount();
  });
}


function performLogout() {
  clearCurrentUsername();
  currentUserRef = null;
  loadAccount();
  updateWalletHint();
}

if (logoutBtn)    logoutBtn.addEventListener("click", performLogout);
if (headerLogout) headerLogout.addEventListener("click", performLogout);


if (topUpBtn) {
  topUpBtn.addEventListener("click", () => {
    const user   = getCurrentUser();
    const amount = Math.max(0, parseInt(topUpAmount.value, 10) || 0);
    if (!user || amount <= 0) return;

    user.wallet += amount;
    saveUsers();
    topUpAmount.value = "";
    renderAccountPanel();
    updateWalletHint();
  });
}


if (addressForm) {
  addressForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    user.address = {
      savedAddress: document.getElementById("savedAddress").value.trim(),
      savedCity:    document.getElementById("savedCity").value.trim(),
      savedPincode: document.getElementById("savedPincode").value.trim(),
    };
    saveUsers();

    addressStatus.textContent = "Address saved.";
    addressStatus.className   = "form-status success";
    prefillCheckoutFromAddress(user);
  });
}


function loadAccount() {
  const user     = getCurrentUser();
  const username = getCurrentUsername();

  if (accountStatus) {
    accountStatus.textContent = user ? `Hi, ${username}` : "Log in";
  }
  if (headerLogout) {
    user ? headerLogout.classList.remove("hidden") : headerLogout.classList.add("hidden");
  }
  if (authPanel) {
    user ? authPanel.classList.add("hidden") : authPanel.classList.remove("hidden");
  }
  if (accountPanel) {
    user ? accountPanel.classList.remove("hidden") : accountPanel.classList.add("hidden");
  }

  if (user) {
    renderAccountPanel();
    prefillCheckoutFromAddress(user);
  }
}

function renderAccountPanel() {
  const user = getCurrentUser();
  if (!user) return;

  if (walletBalanceEl) walletBalanceEl.textContent = formatPrice(user.wallet);

  const savedAddressEl = document.getElementById("savedAddress");
  const savedCityEl    = document.getElementById("savedCity");
  const savedPincodeEl = document.getElementById("savedPincode");
  if (savedAddressEl) savedAddressEl.value = user.address.savedAddress || "";
  if (savedCityEl)    savedCityEl.value    = user.address.savedCity    || "";
  if (savedPincodeEl) savedPincodeEl.value = user.address.savedPincode || "";

  if (!ordersList) return;

  if (user.orders.length === 0) {
    ordersList.innerHTML = `<li class="empty-msg">No orders placed yet.</li>`;
    return;
  }

  ordersList.innerHTML = user.orders.map((order) => {
    const date = new Date(order.placedAt).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
    const itemSummary = order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ");
    return `
      <li class="order-entry">
        <div class="order-entry-head">
          <span>${date}</span>
          <span>${formatPrice(order.total)}</span>
        </div>
        <div class="order-entry-meta">${itemSummary}</div>
      </li>
    `;
  }).join("");
}

function prefillCheckoutFromAddress(user) {
  if (!user.address) return;
  const fullNameField = document.getElementById("fullName");
  if (fullNameField && !fullNameField.value) {
    fullNameField.value = getCurrentUsername();
  }
  const addrEl    = document.getElementById("address");
  const cityEl    = document.getElementById("city");
  const pincodeEl = document.getElementById("pincode");
  if (addrEl)    addrEl.value    = user.address.savedAddress || "";
  if (cityEl)    cityEl.value    = user.address.savedCity    || "";
  if (pincodeEl) pincodeEl.value = user.address.savedPincode || "";
}


function getSubmittedReviews() {
  try {
    const saved = localStorage.getItem("stylehub-reviews");
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    return {};
  }
}

function saveSubmittedReview(productId, review) {
  const all = getSubmittedReviews();
  if (!all[productId]) all[productId] = [];
  all[productId].push(review);
  localStorage.setItem("stylehub-reviews", JSON.stringify(all));
}

function getReviews(productId) {
  const product   = products.find((p) => p.id === productId);
  const submitted = getSubmittedReviews()[productId] || [];
  return [...product.reviews, ...submitted];
}

function getAverageRating(productId) {
  const reviews = getReviews(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, r) => total + r.rating, 0);
  return sum / reviews.length;
}

function renderStars(rating) {
  const rounded = Math.round(rating);
  const full    = "★".repeat(rounded);
  const empty   = "☆".repeat(5 - rounded);
  return `<span class="stars">${full}${empty}</span>`;
}


const productModalOverlay = document.getElementById("productModalOverlay");
const productModal        = document.getElementById("productModal");
const modalClose          = document.getElementById("modalClose");
const modalMainImage      = document.getElementById("modalMainImage");
const modalThumbs         = document.getElementById("modalThumbs");
const modalProductName    = document.getElementById("modalProductName");
const modalMeta           = document.getElementById("modalMeta");
const modalRating         = document.getElementById("modalRating");
const modalPrice          = document.getElementById("modalPrice");
const modalQty            = document.getElementById("modalQty");
const modalAddBtn         = document.getElementById("modalAddBtn");
const reviewList          = document.getElementById("reviewList");
const reviewForm          = document.getElementById("reviewForm");

let activeProductId = null;

function openProductModal(productId) {
  if (!productModal) return;
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  activeProductId = productId;

  modalProductName.textContent = product.name;
  modalMeta.textContent        = product.meta;
  modalPrice.textContent       = formatPrice(product.price);
  modalQty.value = 1;

  setMainImage(product.images[0]);
  modalThumbs.innerHTML = product.images.map((src, index) => `
    <img class="modal-thumb ${index === 0 ? "active" : ""}" src="${src}" alt="${product.name} view ${index + 1}">
  `).join("");

  renderModalRating(productId);
  renderReviewList(productId);

  productModalOverlay.classList.add("open");
  productModal.classList.add("open");
}

function setMainImage(src) {
  if (modalMainImage) modalMainImage.src = src;
}

if (modalThumbs) {
  modalThumbs.addEventListener("click", (event) => {
    const thumb = event.target.closest(".modal-thumb");
    if (!thumb) return;
    setMainImage(thumb.src);
    modalThumbs.querySelectorAll(".modal-thumb").forEach((el) => el.classList.remove("active"));
    thumb.classList.add("active");
  });
}

function renderModalRating(productId) {
  if (!modalRating) return;
  const average = getAverageRating(productId);
  const count   = getReviews(productId).length;
  modalRating.innerHTML = `${renderStars(average)} <span class="rating-count">${average.toFixed(1)} · ${count} review${count === 1 ? "" : "s"}</span>`;
}

function renderReviewList(productId) {
  if (!reviewList) return;
  const reviews = getReviews(productId);

  if (reviews.length === 0) {
    reviewList.innerHTML = `<li class="empty-msg">No reviews yet — be the first.</li>`;
    return;
  }

  reviewList.innerHTML = reviews.map((review) => `
    <li class="review-entry">
      <div class="review-entry-head">
        <span>${review.name}</span>
        ${renderStars(review.rating)}
      </div>
      <p>${review.comment}</p>
    </li>
  `).join("");
}

function closeProductModal() {
  if (!productModal) return;
  productModalOverlay.classList.remove("open");
  productModal.classList.remove("open");
  activeProductId = null;
}

if (modalClose)           modalClose.addEventListener("click", closeProductModal);
if (productModalOverlay)  productModalOverlay.addEventListener("click", closeProductModal);

if (modalAddBtn) {
  modalAddBtn.addEventListener("click", () => {
    if (!activeProductId) return;
    const quantity = Math.max(1, parseInt(modalQty.value, 10) || 1);
    addToCart(activeProductId, quantity);
    closeProductModal();
    openCart();
  });
}

if (reviewForm) {
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!activeProductId) return;

    const review = {
      name:    document.getElementById("reviewName").value.trim(),
      rating:  parseInt(document.getElementById("reviewRating").value, 10),
      comment: document.getElementById("reviewComment").value.trim(),
      date:    new Date().toISOString(),
    };

    saveSubmittedReview(activeProductId, review);
    renderModalRating(activeProductId);
    renderReviewList(activeProductId);
    window.StyleHub.refreshCatalog();
    reviewForm.reset();
  });
}


renderCart();
loadAccount();

window.StyleHub = {
  products,
  formatPrice,
  getAverageRating,
  getReviews,
  openProductModal,
  addToCart,
  openCart,
};
