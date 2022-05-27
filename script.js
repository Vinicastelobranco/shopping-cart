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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
    event.target.remove();
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
    cartSection.appendChild(createCartItemElement({
      sku: id,
      name: title,
      salePrice: price,
    }));
    const cartItems = cartSection.innerHTML;
    saveCartItems(cartItems);
  };
  
  const buttons = async () => {
    const itemsButtons = document.querySelectorAll('.item__add');
    itemsButtons.forEach((item) => item.addEventListener('click', () => {
      cartData(item);    
    }));
  };

  window.onload = async () => {
  await printItems();
  await buttons();
  if (!localStorage.getItem('cartItems') === false) {
    const savedItems = JSON.parse(getSavedCartItems());
    const storageResult = document.querySelector('.cart__items');
    storageResult.innerHTML = savedItems;
  } 
 };
