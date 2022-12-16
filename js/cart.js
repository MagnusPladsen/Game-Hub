import { games } from "./gamesData.js";

console.log(games)

const gamesInCart = document.querySelector(".games-in-cart");

const cart = [];

if (sessionStorage.getItem("cart")) {
  const getCart = JSON.parse(sessionStorage.getItem("cart"));
  cart.push(...getCart);
  console.log("cart", cart);
}

function addToCart(productId) {
  cart.push(productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  console.log(window.sessionStorage.getItem("cart"));
  console.log("cart", cart);
}

function getCart() {
  const newCart = sessionStorage.getItem("cart");
  return newCart;
}

if (gamesInCart) {
  const updatedCart = JSON.parse(getCart());
  gamesInCart.innerHTML = "";
  updatedCart.forEach(gameId => {
    const game = games[gameId];
    console.log(game)
    gamesInCart.innerHTML += `
    <div class="game-in-cart">
      <div class="game-in-cart-image">
        <img src="${game.image}" alt="${game.name}">
      </div>
      <div class="game-in-cart-info">
        <div class="game-in-cart-info-row1">
          <h3 class="game-in-cart-title">${game.name}</h3>
          <p class="game-in-cart-description">${game.description}</p>
        </div>
        <div class="game-in-cart-info-row2">
          <p class="game-in-cart-price">${game.price}</p>
          <button class="game-in-cart-button cta">Remove</button>
        </div>
      </div>
    </div>`
  })
}




export { addToCart, cart };