let myproducts = JSON.parse(localStorage.getItem("mycart")) || [];

function updateCartTotals() {
  let totalItems = 0;
  let totalPrice = 0;

  myproducts.forEach((item) => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  document.getElementById("total-items-count").innerText = totalItems;
  document.getElementById("total-price-value").innerText =
    `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.querySelector("#cartCount").innerHTML = totalItems;
}

function increaseQuantity(id) {
  let productIndex = myproducts.findIndex((item) => item.id === id);
  if (productIndex !== -1) {
    myproducts[productIndex].quantity++;
    localStorage.setItem("mycart", JSON.stringify(myproducts));
    renderCart();
  }
}

function decreaseQuantity(id) {
  let productIndex = myproducts.findIndex((item) => item.id === id);
  if (productIndex !== -1) {
    if (myproducts[productIndex].quantity > 1) {
      myproducts[productIndex].quantity--;
    } else {
      myproducts = myproducts.filter((item) => item.id !== id);
    }
    localStorage.setItem("mycart", JSON.stringify(myproducts));
    renderCart();
  }
}

function removeFromCart(id) {
  myproducts = myproducts.filter((item) => item.id !== id);
  localStorage.setItem("mycart", JSON.stringify(myproducts));
  renderCart();
}

function clearCart() {
  myproducts = [];
  localStorage.removeItem("mycart");
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  if (!cartItemsContainer) return;

  if (myproducts.length === 0) {
    cartItemsContainer.innerHTML = `<p class="text-center text-slate-500 py-8">Your cart is empty.</p>`;
    document.getElementById("cart-summary").style.display = "none";
  } else {
    document.getElementById("cart-summary").style.display = "block";
    let productsHtml = myproducts
      .map(function (item) {
        return `
        <div class="flex items-center p-4 bg-white rounded-xl shadow-sm mb-4">
            <img src="${item.thumbnail}" alt="${item.title}" class="w-20 h-20 object-cover rounded-lg mr-4"/>
            <div class="flex-1">
                <p class="text-xs text-slate-500 uppercase font-semibold">${item.category || "N/A"}</p>
                <h4 class="font-bold text-slate-900 text-base mb-1">${item.title}</h4>
                <div class="flex items-center space-x-2">
                    <button onclick="decreaseQuantity(${item.id})" class="bg-slate-100 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">-</button>
                    <span class="text-slate-900 font-semibold">${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})" class="bg-slate-100 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">+</button>
                </div>
            </div>
            <div class="text-right">
                <button onclick="removeFromCart(${item.id})" class="text-red-500 text-sm mb-1">Remove</button>
                <p class="font-bold text-slate-900 text-lg">$${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
        </div>
      `;
      })
      .join("");

    cartItemsContainer.innerHTML = productsHtml;
    updateCartTotals();
  }
}

 renderCart();

let initialCartLength = JSON.parse(localStorage.getItem("mycart")) || [];
document.querySelector("#cartCount").innerHTML = initialCartLength.reduce(
  (sum, item) => sum + item.quantity,
  0,
);

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});
