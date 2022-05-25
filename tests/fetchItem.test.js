require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Espera que fetchItem seja uma função', () => {
    expect(typeof fetchItem).toBe('function');
    });
  
    it('Verifica se fetch é chamado ao executar a função fetchItem com parâmentro "MLB1615760527"', async () => {
        await fetchItem('MLB1615760527');
        expect(fetch).toHaveBeenCalled
    });
  
    it('Verifica se, ao executar a função fetchItem com parâmetro "MLB1615760527", a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/MLB1615760527`)
    });
  
    it('Verifica se o retorno da função fetchProducts com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
      const fetchObject = await fetchItem('MLB1615760527');
      expect(fetchObject).toEqual(item);
    });
  
    it('Verifica se, ao chamar fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url', async () => {
      await fetchItem('computador');
      expect(await fetchItem()).toEqual(new Error('You must provide an url'));
    });
});
