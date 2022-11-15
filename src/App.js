import Shop from "./components/shop.js";
import Store from "../store.js";
import Nav from "./components/nav.js";
import Cart from "./components/cart.js";
import DropDown from "./components/dropDown.js";
import Pagination from "./components/pagination.js";
import { Api } from "./api.js";
export default class App {
  constructor({ $target }) {
    window.location.hash = "";
    window.addEventListener("hashchange", () => {
      const path = location.hash;
      const currentPage = path.substring(6);

      if (path === "#shop") {
        $target.innerHTML = "";

        nav.updateNav(path);
        drop.dropRender();
        shop.shopRender();
        pagi.pagiRender();
      }
      if (path === "#cart") {
        $target.innerHTML = "";
        nav.updateNav(path);
        cart.cartRender(path);
      }
      if (path === `#shop/${currentPage}`) {
        $target.innerHTML = "";

        nav.updateNav(path);
        drop.dropRender();
        shop.shopRender();
        pagi.pagiRender();
      }
    });

    const store = new Store();

    const nav = new Nav({ $target, store });
    const shop = new Shop({
      $target,
      nav,
      store,
      navRender: nav.render,
    });

    const cart = new Cart({ $target, store, navRender: nav.render });
    const drop = new DropDown({
      $target,
      store,
      shopRender: shop.shopRender,
    });
    const pagi = new Pagination({
      $target,
      shopRender: shop.shopRender,
      store,
    });
    nav.updateNav();
    drop.dropRender();
    shop.shopRender();
    pagi.pagiRender();
  }
}
