import { addToCart, cart } from "./cart.js";

const addToCartButton = document.getElementById("add-to-cart");


addToCartButton.addEventListener("click", function (e) {
    e.preventDefault();
    addToCart("01");
});