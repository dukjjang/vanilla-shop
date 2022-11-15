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
        this.dropValue = this.store.getDropValue();
        this.buttonCount = this.items.length / this.dropValue;
        this.render();
        $target.appendChild(this.$element);
      } else {
        console.log("else this.items?", this.items);
        this.dropValue = this.store.getDropValue();
        this.buttonCount = this.items.length / this.dropValue;
        this.render();
        $target.appendChild(this.$element);
      }
      console.log(
        "items.length",
        this.items.length,
        "dropValue",
        this.dropValue,
        "buttonCount",
        this.buttonCount
      );
    };
    this.$element.addEventListener("click", (e) => {
      this.store.setCurrentPage(e.target.dataset.currentnum);
    });
  }
  render() {
    const pagiArray = [];
    pagiArray.push(`<div> << </div>`);
    for (let i = 0; i < Math.ceil(this.buttonCount); i++) {
      pagiArray.push(
        `<a href="/#shop/${i + 1}"><button data-currentnum="${
          i + 1
        }" id="pagi-${i + 1}">${i + 1}</button></a>`
      );
    }
    pagiArray.push(`<div> >> </div>`);
    this.$element.innerHTML = pagiArray.join("");
  }
}

// 필요한 변수?
// 1. 드롭다운벨류 = store에서 가져오면 됌
// 2. 전체아이템 갯수 = store에서 가져오면 됌
//
//
// length가 25고 drop이 5면
// 총 페지네이션 버튼의 갯수는 ? items.length / dropValue
