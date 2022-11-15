export default class Nav {
  constructor({ $target, store }) {
    this.store = store;
    this.$element = document.createElement("div");
    this.$element.className = "navbar";
    this.Links = [
      { name: "home", path: "/" },
      { name: "cart", path: "/cart" },
    ];

    this.updateNav = (path) => {
      this.path = path;
      this.render();
      this.$target.appendChild(this.$element);
    };
    this.$target = $target;
    this.$element.addEventListener("click", (e) => {
      if (e.target.dataset.type === "cart") {
      }
    });
    this.render = () => {
      const localCartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (localCartItems) {
        this.cartItemsCount = localCartItems.length;
      } else this.cartItemsCount = 0;
      const link =
        this.path === "#cart"
          ? `<a href="/#shop"><i class="bi bi-shop"></i></a>`
          : `<a href="/#cart"><i data-type="bag" class="bi bi-bag-dash"></i></a>`;
      this.$element.innerHTML = `
         <h1><a href="#shop">Vanilla Shop</a></h1>
         <div id="navbar" class="nav">
           <div class="navLink">
           ${link}
           <div id="cartAmount" class="cartAmount">${this.cartItemsCount}</div>
           </div>
         </div>
`;
    };
  }
}
