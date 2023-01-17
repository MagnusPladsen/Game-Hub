import { addToCart, cart } from "./cart.js";

const url = "https://www.gameapi.magnuspladsen.no/wp-json/wc/store/products";

const consumerKey = "ck_f96a912e5559de0b44079cab28505840ef53051a";

const consumerSecret = "cs_a7140b28c38e1a037d5e2db1b3b7ad0acf516ccf";

const addToCartButton = document.getElementById("add-to-cart");
const gamesContainer = document.getElementById("games-container");
const gameContainer = document.getElementById("game-container");
const gameHeader = document.getElementById("header");

async function fetchGames() {
  const response = await fetch(url);
  const data = await response.json();
  sessionStorage.setItem("games", JSON.stringify(data));
}

function getFirstTwo(number) {
  return number.slice(0, 2);
}

function displayGames(gamesArray) {
  // if on games page
  if (gamesContainer) {
    gamesArray.forEach((game) => {
      gamesContainer.innerHTML += `
          <div class="game-display">
              <a href="./games-info.html?id=${game.id}">
              <p class="display-title">${game.name}</p>
              <img src="${game.images[0].src}" alt="Image of the ${
        game.name
      } game" />
              <p class="display-price">Price: <strong>$${getFirstTwo(
                game.prices.price
              )}</strong></p>
              </a>
          </div>`;
    });
  } else if (gameContainer) {
    // if on game info page
    const gameId = new URLSearchParams(window.location.search).get("id");
    const game = gamesArray.find((game) => game.id == gameId);
    gameContainer.innerHTML = `
      <div class="left-column">
          <img src="${game.images[0].src}" alt="Image of the ${
      game.name
    } game" />
      </div>
      <div class="right-column">
          <p class="game-info"><span class="bold">${
            game.attributes.find((attribute) => attribute.name === "Age Rating")
              .name
          }:</span> ${
      game.attributes.find((attribute) => attribute.name === "Age Rating")
        .terms[0].name
    }</p>
          <p class="game-info"><span class="bold">${
            game.attributes.find((attribute) => attribute.name === "Platform")
              .name
          }:</span> ${
      game.attributes.find((attribute) => attribute.name === "Platform")
        .terms[0].name
    } </p>
          <p class="game-info"><span class="bold">${
            game.attributes.find((attribute) => attribute.name === "Condition")
              .name
          }:</span> ${
      game.attributes.find((attribute) => attribute.name === "Condition")
        .terms[0].name
    } </p>
          <p class="game-info"><span class="bold">PRICE:</span> $${getFirstTwo(
            game.prices.price
          )}</p>
          <p class="game-description">${game.description}</p>
      </div>`;
    gameHeader.innerHTML = `
      ${game.name.toUpperCase()}`;
    addToCartButton.addEventListener("click", function (e) {
      e.preventDefault();
      addToCart(gameId, addToCartButton);
    });
  }
}

if (sessionStorage.getItem("games")) {
  // Games already cached in sessionStorage, show from cache
  const getGames = JSON.parse(sessionStorage.getItem("games"));
  displayGames(getGames);
  console.log(getGames)
} else {
  // First time loading page, fetch games and cache to sessionStorage
  fetchGames();
  const getGames = JSON.parse(sessionStorage.getItem("games"));
  displayGames(getGames);
}


// DETTE MANGLER
// If you have a ‘Featured’ section, find a way to flag ‘Featured items’ on WordPress and pull that onto your pages
// If you have filters or sorts on your website, try sorting through the results you’re getting back from the API. 


// Submission 
// By the end of the CA, you will: 
// have installed WordPress on a web host and created a list of products 
// be making an API call to fetch the products to your cross-course project
// be using query strings to let the user click to view an individual product. 
// You need to complete all of the above to receive a passing grade. 
// 
// Submit a link to your updated website. 