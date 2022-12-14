const gamesInCart = document.querySelector(".games-in-cart");

const cart = [];

function addToCart(productId) {
  cart.push(productId);
}

function showCart() {
  return cart;
}

console.log("cart.js", cart);

if (gamesInCart) {
  gamesInCart.innerHTML += cart.length;
}


export { addToCart, cart };