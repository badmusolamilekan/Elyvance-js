let allProducts = {};

async function fetchAndRenderProducts(category, limit, sortBy, order, targetElementId) {
  try {
    let url = `https://dummyjson.com/products`;
    if (category) {
      url += `/category/${category}`;
    }
    url += `?limit=${limit}`;
    if (sortBy) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const products = data.products;

    products.forEach((product) => {
      allProducts[product.id] = product;
    });

    const target = document.getElementById(targetElementId);
    if (target) target.innerHTML = buildProductsHtml(products);
  } catch (error) {
    console.error(`Error fetching or rendering products for ${targetElementId}:`, error);
  }
}

function buildProductsHtml(products) {
  return products.map(function (values) {
    return `
      <div class="product-card group bg-white rounded-[2rem] border border-slate-100 p-5 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col">
        <div class="relative aspect-square rounded-[1.5rem] overflow-hidden bg-slate-50 mb-6">
          <img
            src="${values.thumbnail}"
            alt="${values.title}"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div class="px-1 flex-1 flex flex-col">
          <h3 class="font-bold text-slate-900 text-xl leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2">
            ${values.title}
          </h3>
          <p class="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
            ${values.description}
          </p>
          <div class="flex items-center justify-between pt-4 border-t border-slate-100">
            <span class="text-2xl font-black text-slate-900">$${values.price.toLocaleString()}</span>
            <button
              onclick="addToCart(${values.id})"
              class="text-white px-4 py-2 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

const homeGrid = document.getElementById("home-product-grid");
const shopGrid = document.getElementById("shop-product-grid");

if (homeGrid) fetchAndRenderProducts("smartphones", 8, null, null, "home-product-grid");
if (shopGrid) fetchAndRenderProducts(null, 50, "title", "asc", "shop-product-grid");

function updateAllCartCounts() {
  const allcart = JSON.parse(localStorage.getItem("mycart")) || [];
  const totalItems = allcart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.querySelectorAll("#cartCount, #cartCountMobile").forEach((el) => {
    el.textContent = totalItems > 0 ? totalItems : "";
  });
}

function addToCart(id) {
  let productToAdd = allProducts[id];
  if (!productToAdd) {
    alert("Product not found!");
    return;
  }

  let allcart = JSON.parse(localStorage.getItem("mycart")) || [];
  let existing = allcart.find((item) => item.id === productToAdd.id);
  if (existing) {
    return;
  }
  productToAdd.quantity = 1;
  allcart.push(productToAdd);
  localStorage.setItem("mycart", JSON.stringify(allcart));
  updateAllCartCounts();
}

function ProductFilter() {
  const search = document.querySelector(".search-bar").value;
  const grid = homeGrid || shopGrid;

  if (!grid) return;

  const productFilter = Object.values(allProducts).filter((value) =>
    value.title.toLowerCase().includes(search.toLowerCase())
  );

  if (productFilter.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-zinc-400 py-20 text-lg">No products found.</p>`;
  } else {
    grid.innerHTML = buildProductsHtml(productFilter);
  }
}

updateAllCartCounts();

 const menuToggle = document.getElementById('menuToggle');
      const mobileMenu = document.getElementById('mobileMenu');
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      });


let mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.classList.remove("hidden");
  } else {
    mybutton.classList.add("hidden");
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
}