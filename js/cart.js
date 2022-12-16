import { games } from "./gamesData.js";

console.log(games)

const gamesInCart = document.querySelector(".games-in-cart");

const cart = [];

function addToCart(productId) {
  cart.push(productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  const newCart = window.localStorage.getItem("cart");
  console.log("newCart", newCart);
}

function getCart() {
  const newCart = sessionStorage.getItem("cart");
  return newCart;
}

if (gamesInCart) {
  const updatedCart = JSON.parse(getCart());
  updatedCart.forEach(gameId => {
    const game = games[gameId];
    console.log(game)
    gamesInCart.innerHTML += `<div class="game-in-cart">
    <h3>${game.name}</h3>
    <img class="game-in-cart-image" src="${game.image}" alt="${game.name}">
    </div>`
  })
}




export { addToCart, cart };