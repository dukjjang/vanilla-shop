export default class Store {
  constructor() {
    this.items = [];
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    this.cartItems = cartItems ? cartItems : [];
    this.dropValue = 5;
    this.currentPage = 1;
  }

  getItems = () => {
    return this.items;
  };

  setItems = (newItems) => {
    this.items = newItems.map((item) => {
      item.title = item.title.split(" ")[0];
      return { ...item, quantity: 0 };
    });
    localStorage.setItem("items", JSON.stringify(this.items));
  };

  setAddToCart = (newItem) => {
    const targetItem = this.cartItems.find((item) => {
      return item.id === newItem.id;
    });
    if (targetItem) {
      targetItem.quantity += newItem.quantity;
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    } else {
      this.cartItems.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    }
  };

  getCartItems = () => {
    return this.cartItems;
  };

  setQuantity = (id, newQuantity) => {
    const targetItem = this.items.filter((item) => {
      return item.id === id;
    });
    targetItem.quantity = newQuantity;
    localStorage.setItem("items", JSON.stringify(this.items));

    const targetCartItem = this.cartItems.find((item) => {
      return item.id === id;
    });
    if (targetCartItem) {
      targetCartItem.quantity = newQuantity;
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    }
  };
  removeCart = (id) => {
    this.cartItems = this.cartItems.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  };

  setDropValue = (value) => {
    console.log("setDropValue", value);
    this.dropValue = Number(value);
  };
  getDropValue = () => {
    return this.dropValue;
  };
  setCurrentPage = (value) => {
    console.log("currentPage set", value);
    this.currentPage = value;
  };
  getCurrentPage = () => {
    return this.currentPage;
  };
}
