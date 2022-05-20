const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = async (product) => {
  try {
  const response = await fetch(`${endpoint}${product}`);
  const json = await response.json();
  return json;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
