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
      this.searchItems = this.store.getSearchItems();
      this.currentPage = this.store.getCurrentPage();
      const keyword = this.store.getKeyword();
      if ((this.searchItems.length === 0, keyword === "")) {
        this.buttonCount = this.items.length / this.dropValue;
      } else {
        this.buttonCount = this.searchItems.length / this.dropValue;
        if (this.buttonCount + 1 < this.currentPage) {
          this.store.setCurrentPage(Math.ceil(this.buttonCount));
          shopRender();
          this.pagiRender();
        }
      }

      this.render();
      $target.appendChild(this.$element);
    };
    this.$element.addEventListener("click", (e) => {
      this.store.setCurrentPage(e.target.dataset.currentnum);
      this.render();
    });
  }
  render() {
    const prevNum =
      this.currentPage > 1 ? this.currentPage - 1 : this.currentPage;
    const nextNum =
      this.currentPage < this.buttonCount
        ? this.currentPage + 1
        : this.currentPage;
    const pagiArray = [];
    pagiArray.push(
      `<a href="/#shop/${prevNum}"><div data-currentnum="${prevNum}"> << </div></a>`
    );
    for (let i = 0; i < Math.ceil(this.buttonCount); i++) {
      pagiArray.push(
        `<a href="/#shop/${i + 1}"><button class="pagination__btn ${
          this.currentPage === i + 1 ? "pagination__current" : ""
        }" data-currentnum="${i + 1}" id="pagi-${i + 1}">${i + 1}</button></a>`
      );
    }
    pagiArray.push(
      `<a href="/#shop/${nextNum}"><div data-currentnum="${nextNum}"> >> </div></a>`
    );
    this.$element.innerHTML = pagiArray.join("");
  }
}
