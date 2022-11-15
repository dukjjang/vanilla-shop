export default class Search {
  constructor({ $target, shopRender, pagiRender, store }) {
    this.$element = document.createElement("div");
    this.$element.className = "search";
    this.$select = document.createElement("select");
    this.$select.className = "dropDown__select";

    this.$Input = document.createElement("input");
    this.$Input.className = "dropDown__input";

    this.$select.addEventListener("change", (e) => {
      store.setDropValue(e.target.value);
      store.setCurrentPage(1);
      window.location.hash =
        this.dropValue === 4 ? "#shop/drop4" : "#shop/drop8";
    });
    this.dropRender = () => {
      this.dropValue = store.getDropValue();
      this.render();
      this.$element.appendChild(this.$Input);
      this.$element.appendChild(this.$select);
      $target.appendChild(this.$element);
    };
    this.$Input.addEventListener("keyup", (e) => {
      console.log(e.target.value);
      store.setKeyword(e.target.value);
      // window.location.hash = `/#shop:${keyup}`;
      shopRender();
      pagiRender();
    });
  }
  render() {
    this.$select.innerHTML = `
   <option ${this.dropValue === 4 ? "selected" : ""} value="4">4개씩</option>
   <option ${this.dropValue === 8 ? "selected" : ""} value="8">8개씩</option>
`;
  }
}
