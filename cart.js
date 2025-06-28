function loadCart() {
  const tbl = document.querySelector(".cart-table");
  tbl.innerHTML = "";
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (!Object.keys(cart).length) {
    tbl.innerHTML = "<tr><td>Your cart is empty.</td></tr>";
    document.getElementById("total-price").textContent = "0.00";
    return;
  }

  // header
  tbl.innerHTML = `
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Subtotal</th>
      <th></th>
    </tr>
  `;

  let total = 0;
  const products = JSON.parse(localStorage.getItem("products")) || defaultProducts;

  for (let id in cart) {
    const p = products.find(x => x.id === +id);
    const qty = cart[id];
    const sub = p.price * qty;
    total += sub;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.name}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td>
        <button class="decrease" data-id="${id}">−</button>
        ${qty}
        <button class="increase" data-id="${id}">+</button>
      </td>
      <td>$${sub.toFixed(2)}</td>
      <td><button class="remove" data-id="${id}">Remove</button></td>
    `;
    tbl.appendChild(row);
  }

  document.getElementById("total-price").textContent = total.toFixed(2);
  bindCartButtons();
}

function bindCartButtons() {
  document.querySelectorAll(".increase").forEach(btn =>
    btn.addEventListener("click", () => changeQty(btn.dataset.id, +1))
  );
  document.querySelectorAll(".decrease").forEach(btn =>
    btn.addEventListener("click", () => changeQty(btn.dataset.id, -1))
  );
  document.querySelectorAll(".remove").forEach(btn =>
    btn.addEventListener("click", () => removeItem(btn.dataset.id))
  );
}

function changeQty(id, delta) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] < 1) delete cart[id];
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function removeItem(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  delete cart[id];
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", loadCart);
