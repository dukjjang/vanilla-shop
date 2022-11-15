import Item from "./item.js";
export default class Cart {
  cartItems;
  constructor({ $target, store, navRender }) {
    this.$target = $target;
    this.store = store;
    this.$element = document.createElement("div");
    this.$element.className = "cart";
    this.navRender = navRender;
    this.cartRender = (path) => {
      this.cartItems = JSON.parse(localStorage.getItem("cartItems"));
      this.path = path;
      this.$element.innerHTML = "";
      this.render(this.path);
      this.$target.appendChild(this.$element);
    };
  }
  render = () => {
    if (this.cartItems) {
      this.cartItems.map((el) => {
        const { id, description, image, title, price, quantity } = el;
        const item = new Item({
          $target: this.$element,
          id,
          image,
          title,
          price,
          quantity,
          description,
          setQuantity: this.store.setQuantity,
          setAddToCart: this.store.setAddToCart,
          navRender: this.navRender,
          currentPath: this.path,
          removeCart: this.store.removeCart,
          cartRender: this.cartRender,
        });
        this.$element.appendChild(item.returnEL());
      });
    }
  };
}
