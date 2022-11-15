import { Api } from "../api.js";
export default class Pagination {
  constructor({ $target, shopRender, store }) {
    const ele = document.createElement("div");
    ele.id = "pagination";
    this.$element = ele;
    this.store = store;
    this.items = [];
    this.api = new Api();
    this.pagiRender = async () => {
      if (this.items.length === 0) {
        const res = await this.api.request("/products");
        await this.store.setItems(res);
        this.items = this.store.getItems();
      } else {
        this.items = this.store.getItems();
      }
      this.dropValue = this.store.getDropValue();
      this.buttonCount = this.items.length / this.dropValue;
      this.currentPage = this.store.getCurrentPage();
      this.render();
      $target.appendChild(this.$element);
    };
    this.$element.addEventListener("click", (e) => {
      this.store.setCurrentPage(e.target.dataset.currentnum);
      this.render();
    });
  }
  render() {
    const pagiArray = [];
    pagiArray.push(`<div> << </div>`);
    for (let i = 0; i < Math.ceil(this.buttonCount); i++) {
      pagiArray.push(
        `<a href="/#shop/${i + 1}"><button class="pagination__btn ${
          this.currentPage === i + 1 ? "pagination__current" : ""
        }" data-currentnum="${i + 1}" id="pagi-${i + 1}">${i + 1}</button></a>`
      );
    }
    pagiArray.push(`<div> >> </div>`);
    this.$element.innerHTML = pagiArray.join("");
  }
}
