const defaultProducts = [
  { id: 1, name: "Coffee Beans", price: 10, img: "assets/coffee_beans.jpg" },
  { id: 2, name: "Espresso Machine", price: 99, img: "assets/espresso_machine.jpg" },
  { id: 3, name: "French Press", price: 25, img: "assets/french_press.jpg" },
  { id: 4, name: "Coffee Mug", price: 8, img: "assets/mug.jpg" },
];

function getProducts() {
  // If admin has added products, use those; otherwise default
  return JSON.parse(localStorage.getItem("products")) || defaultProducts;
}

function loadProducts() {
  const grid = document.querySelector("#products .products-grid");
  const products = getProducts();

  products.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    // staggered animation delay
    card.style.animationDelay = `${(i + 1) * 0.1}s`;
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <h3>${p.name}</h3>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => addToCart(+btn.dataset.id));
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || {};
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = Object.values(cart).reduce((sum, n) => sum + n, 0);
  const el = document.querySelector("#cart-count");
  el.textContent = count;
  el.classList.add("pop");
  el.addEventListener("animationend", () => {
    el.classList.remove("pop");
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartCount();
});
