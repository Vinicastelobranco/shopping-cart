const saveCartItems = (itemsCart) => {
  localStorage.setItem('cartItems', JSON.stringify(itemsCart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
