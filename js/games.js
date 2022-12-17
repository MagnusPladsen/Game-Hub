import { addToCart, cart } from "./cart.js";
import { games } from "./gamesData.js";

const addToCartButton = document.getElementById("add-to-cart");
const gamesContainer = document.getElementById("games-container");
const gameContainer = document.getElementById("game-container");
const gameHeader = document.getElementById("header");

function displayGames() {
  Object.keys(games).forEach((gameId) => {
    const game = games[gameId];
    gamesContainer.innerHTML += `
        <div class="game-display">
            <a href="./games-info.html?id=${gameId}">
            <p class="display-title">${game.name}</p>
            <img src="${game.image}" alt="Image of the ${game.name} game" />
            <p class="display-price">Price: <strong>$${game.price}</strong></p>
            </a>
        </div>`;
  });
}

if (gamesContainer) {
  displayGames();
  displayGames();
  displayGames();
  displayGames();
}

if (gameContainer) {
  const gameId = new URLSearchParams(window.location.search).get("id");
  const game = games[gameId];
  gameContainer.innerHTML = `
    <div class="left-column">
        <img src="${game.image}" alt="Image of the ${game.name} game" />
    </div>
    <div class="right-column">
        <p class="game-info"><span class="bold">AGE RATING:</span> ${game.ageRating}</br>
        <span class="bold">PLATFORM:</span> ${game.platform} </br>
        <span class="bold">CONDITION:</span> ${game.condition} </br>
        <span class="bold">PRICE:</span> $${game.price}</p>
        <p class="game-description">${game.description}</p>
    </div>`;
    gameHeader.innerHTML = `
    ${game.name.toUpperCase()}`
  addToCartButton.addEventListener("click", function (e) {
    e.preventDefault();
    addToCart(gameId);
  });
}
