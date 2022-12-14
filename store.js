export default class Store {
  constructor() {
    this.items = [];
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    this.cartItems = cartItems ? cartItems : [];
    this.dropValue = 4;
    this.currentPage = 1;
    this.keyword = "";
    this.searchItems = [];
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
    this.dropValue = Number(value);
  };
  getDropValue = () => {
    return this.dropValue;
  };
  setCurrentPage = (value) => {
    this.currentPage = value;
  };
  getCurrentPage = () => {
    return Number(this.currentPage);
  };
  setKeyword = (keyword) => {
    if (keyword === "") {
      this.searchItems = [];
      this.currentPage = 1;
    }

    this.keyword = keyword;
  };
  getKeyword = () => {
    return this.keyword;
  };
  setSearchItems = (searchItems) => {
    this.searchItems = searchItems;
  };
  getSearchItems = () => {
    return this.searchItems;
  };
}
