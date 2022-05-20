const fetchItem = async (id) => {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  try {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;  
} catch (error) {
  return error;
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
