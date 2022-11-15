import { Api } from "../api.js";
import Item from "./item.js";

export default class Shop {
  constructor({ $target, store, navRender, cartRender }) {
    this.store = store;
    this.api = new Api();
    this.navRender = navRender;
    this.cartRender = cartRender;
    this.$element = document.createElement("div");
    this.$element.className = "shop";
    this.$target = $target;
    this.shopRender = async () => {
      this.$element.innerHTML = "";

      try {
        if (this.store.items.length === 0) {
          const res = await this.api.request("/products");
          await this.store.setItems(res);
          this.items = this.store.getItems();
        } else {
          this.items = this.store.getItems();
        }
        this.currentPage = this.store.getCurrentPage();
        this.dropValue = this.store.getDropValue();
        const lastNum = this.currentPage * this.dropValue;
        this.filteredItems = this.items.slice(
          lastNum - this.dropValue,
          lastNum
        );
        this.render();
        this.$target.appendChild(this.$element);
      } catch (err) {}
    };
  }
  render = () => {
    if (this.filteredItems) {
      this.filteredItems.map((el) => {
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
        });
        this.$element.appendChild(item.returnEL());
      });
    }
  };
}
