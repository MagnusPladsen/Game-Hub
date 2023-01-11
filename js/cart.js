const gamesInCart = document.querySelector(".games-in-cart");

const cart = [];

const games = JSON.parse(sessionStorage.getItem("games"));

if (sessionStorage.getItem("cart")) {
  const getCart = JSON.parse(sessionStorage.getItem("cart"));
  cart.push(...getCart);
}

function addToCart(productId, buttonElement) {
  cart.push(productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  buttonElement.innerHTML = `Added to Cart!`;
  buttonElement.style.backgroundColor = "gray";
  buttonElement.style.cursor = "default";
  buttonElement.style.pointerEvents = "none";
  buttonElement.style.border = "";
}

function getCart() {
  const newCart = sessionStorage.getItem("cart");
  return newCart;
}

function removeFromCart(gameId) {
  const updatedCart = JSON.parse(getCart());
  const gameIndex = updatedCart.findIndex((id) => id === gameId);
  updatedCart.splice(gameIndex, 1);
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  displaycart();
}

function getFirstTwo(number) {
  return number.slice(0, 2);
}

// check if we are on the cart page
function displaycart() {
  if (gamesInCart) {
    const updatedCart = JSON.parse(getCart());
    if (updatedCart != undefined) {
      gamesInCart.innerHTML = "";
      updatedCart.forEach((gameId) => {
        const game = games.find((game) => game.id == gameId);
        gamesInCart.innerHTML += `
    <div class="game-in-cart">
      <div class="game-in-cart-image">
        <img src="${game.images[0].src}" alt="${game.name}">
      </div>
      <div class="game-in-cart-info">
        <div class="game-in-cart-info-row1">
          <h3 class="game-in-cart-title">${game.name}</h3>
          <p class="game-in-cart-description">${game.description}</p>
        </div>
        <div class="game-in-cart-info-row2">
          <p class="game-in-cart-price">$ ${getFirstTwo(game.prices.price)}</p>
          <button class="game-in-cart-button cta remove-from-cart" id="${gameId}">Remove</button>
        </div>
      </div>
    </div>`;
      });
    }
    const removeFromCartButton =
      document.getElementsByClassName("remove-from-cart");
    Array.from(removeFromCartButton).forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target.id);
        removeFromCart(e.target.id);
      });
    });
  }
}

displaycart();

export { addToCart, cart };
