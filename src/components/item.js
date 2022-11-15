export default class Item {
  constructor({
    $target,
    id,
    setAddToCart,
    setQuantity,
    title,
    price,
    quantity,
    description,
    image,
    navRender,
    currentPath,
    removeCart,
    cartRender,
  }) {
    this.$item = document.createElement("div");
    this.$item.id = id;
    this.$item.className = "item";
    this.id = id;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.$target = $target;
    this.setQuantity = setQuantity;
    this.description = description.slice(0, 50);
    this.currentPath = currentPath;
    this.render();

    // quantity, cartItems update
    this.$item.addEventListener("click", (e) => {
      const type = e.target.dataset.type;
      if (type === "plus" && this.quantity < 10) {
        setQuantity(this.id, this.quantity + 1);
        this.quantity += 1;
        this.render();
        return;
      }
      if (type === "minus" && this.quantity > 0) {
        setQuantity(this.id, this.quantity - 1);
        this.quantity -= 1;
        this.render();
        return;
      }
      if (type === "addCart") {
        const currentItem = {
          id: this.id,
          price: this.price,
          image: this.image,
          quantity: this.quantity,
          title: this.title,
          description: this.description,
        };
        setAddToCart(currentItem);
        setQuantity(0);
        this.quantity = 0;
        this.render();
        navRender();
      }
      if (type === "removeCart") {
        removeCart(this.id);
        cartRender("#cart");
        navRender();
      }
    });
  }
  render() {
    this.$item.innerHTML = `
      <img width="220px" height="250px"src="${this.image}" alt="" />
      <div class="details">
        <a><h3>${this.title}</h3></a>
        <p>${this.description}</p>
        <div class="price-quantity">
          <h2>$${this.price}</h2>
          <div class="item__btns">
            <i data-type="plus" class="bi bi-plus-lg"></i>
            <div id="${this.id}-quantity" class="quantity">
              ${this.quantity}
            </div>
            <i data-type="minus" class="bi bi-dash-lg"></i>
            ${
              this.currentPath !== "#cart"
                ? `<button id="item__btn" class="item__btn" data-type="addCart">담기</button>`
                : `<button id="item__btn" class="item__btn" data-type="removeCart">삭제</button>`
            }
          </div>
        </div>
      </div>
    `;
  }
  returnEL() {
    return this.$item;
  }
}
