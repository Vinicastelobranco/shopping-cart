const cartSection = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

let cartTotal = 0;
const getTotalPrice = document.getElementsByClassName('total-price')[0];
function totalPrice(value) { 
  cartTotal += value;
  getTotalPrice.innerText = cartTotal;
}

function emptyCart() {
  const emptyCartButton = document.getElementsByClassName('empty-cart')[0];
  emptyCartButton.addEventListener('click', () => {
    const clearCart = document.getElementsByClassName('cart__items')[0];
    clearCart.innerHTML = '';
    localStorage.clear();
    totalPrice(cartTotal * -1);
  });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function addLoadingText() {
  const getParent = document.getElementsByClassName('items')[0];
  const textElement = document.createElement('p');
  textElement.className = 'loading';
  textElement.innerText = 'Carregando';
  return getParent.appendChild(textElement);
}

function removeLoadingText() {
  const loadingText = document.querySelector('.loading');
  loadingText.parentNode.removeChild(loadingText);  
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  const item = event.target.innerText;
  const getPrice = item.split('PRICE: $')[1];
  const minusValue = parseFloat(getPrice) * -1;
  totalPrice(minusValue);
    event.target.remove();
    saveCartItems(document.getElementsByClassName('cart__items')[0].innerHTML);
}

const itemsSection = document.querySelector('.items');
const printItems = async () => {
  const products = await fetchProducts('computador');
  const { results } = products;
  results.forEach((product) => {
    const item = createProductItemElement({
      sku: product.id,
      name: product.title,
      image: product.thumbnail });
      itemsSection.appendChild(item);
    });
  };
    
  function createCartItemElement({ sku, name, salePrice }) {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
    li.addEventListener('click', cartItemClickListener);
    return li;
  }
  
  const cartData = async (item) => {
    const getSku = item.parentElement.firstChild.innerText;
    const { id, title, price } = await fetchItem(getSku);
    addLoadingText();
    const result = await fetchItem(getSku);
    cartSection.appendChild(createCartItemElement({
      sku: id,
      name: title,
      salePrice: price,
    }));
    const cartItems = cartSection.innerHTML;
    saveCartItems(cartItems.innerHTML);
    totalPrice(result.cartTotal);
    removeLoadingText();
  };
  
  const buttons = async () => {
    const itemsButtons = document.querySelectorAll('.item__add');
    itemsButtons.forEach((item) => item.addEventListener('click', () => {
      cartData(item);    
    }));
  };

  window.onload = async () => {
  addLoadingText();
  await printItems();
  removeLoadingText();
  await buttons();
  emptyCart();
  if (!localStorage.getItem('cartItems') === null) {
    const savedItems = JSON.parse(getSavedCartItems());
    const storageResult = document.querySelector('.cart__items');
    storageResult.innerHTML = savedItems;
  } 
 };
