require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Espera que fetchProducts seja uma função', () => {
  expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se fetch é chamado ao executar a função fetchProducts com parâmentro "computador"', async () => {
      await fetchProducts('computador');
      expect(fetch).toHaveBeenCalled
  });

  it('Verifica se, ao executar a função fetchProducts com parâmetro "computador", a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/sites/MLB/search?q=computador`)
  });

  it('Verifica se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const fetchObject = await fetchProducts('computador');
    expect(fetchObject).toEqual(computadorSearch);
  });

  it('Verifica se, ao chamar fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url', async () => {
    await fetchProducts('computador');
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
