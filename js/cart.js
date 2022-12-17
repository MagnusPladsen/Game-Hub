import { games } from "./gamesData.js";

const gamesInCart = document.querySelector(".games-in-cart");

const cart = [];

if (sessionStorage.getItem("cart")) {
  const getCart = JSON.parse(sessionStorage.getItem("cart"));
  cart.push(...getCart);
}

function addToCart(productId) {
  cart.push(productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  console.log(window.sessionStorage.getItem("cart"));
}

function getCart() {
  const newCart = sessionStorage.getItem("cart");
  return newCart;
}

// check if we are on the cart page
if (gamesInCart) {
  const updatedCart = JSON.parse(getCart());
  if (updatedCart != undefined) {
    gamesInCart.innerHTML = "";
    updatedCart.forEach((gameId) => {
      const game = games[gameId];
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
          <p class="game-in-cart-price">$ ${game.price}</p>
          <button class="game-in-cart-button cta" id="remove-from-cart">Remove</button>
        </div>
      </div>
    </div>`;
    });
    const removeFromCartButton = document.getElementById("remove-from-cart");
    removeFromCartButton.addEventListener("click", function (e) {
      e.preventDefault();
      removeFromCart(game.id);
    });
  }
}

function removeFromCart(productId) {
  const updatedCart = JSON.parse(getCart());
  const newCart = updatedCart.filter((gameId) => gameId !== productId);
  sessionStorage.setItem("cart", JSON.stringify(newCart));
}

export { addToCart, cart };
