document.getElementById("product-form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const price = parseFloat(this.price.value);
    const img   = this.img.value.trim();

    if (!name || isNaN(price) || !img) return;

    const stored = JSON.parse(localStorage.getItem("products")) || defaultProducts.slice();
    const nextId = stored.length
      ? stored[stored.length - 1].id + 1
      : 1;

    stored.push({ id: nextId, name, price, img });
    localStorage.setItem("products", JSON.stringify(stored));

    this.reset();
    document.getElementById("feedback").textContent = "✅ Product added!";
    setTimeout(() => {
      document.getElementById("feedback").textContent = "";
    }, 2000);
  });
