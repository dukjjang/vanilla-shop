export default class DropDown {
  constructor({ $target, shopRender, store }) {
    this.$element = document.createElement("div");
    this.$element.className = "dropDown";

    this.$element.addEventListener("change", (e) => {
      store.setDropValue(e.target.value);
      store.setCurrentPage(1);
      window.location.hash =
        this.dropValue === 5 ? "#shop/drop5" : "#shop/drop15";
    });
    this.dropRender = () => {
      this.dropValue = store.getDropValue();
      this.render();
      $target.appendChild(this.$element);
    };
  }
  render() {
    this.$element.innerHTML = `
<input class="dropDown__input"/>
<select class="dropDown__select" number=${this.dropValue}>
   <option ${this.dropValue === 5 ? "selected" : ""} value="5">5개씩</option>
   <option ${this.dropValue === 15 ? "selected" : ""} value="15">15개씩</option>
</select>
`;
  }
}
