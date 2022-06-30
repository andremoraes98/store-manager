const { expect } = require('chai');
const sinon = require('sinon');

const ModelProduct = require('../../../models/modelProducts');
const connection = require('../../../models/connection');

describe('Retorna os produtos', () => {
  describe('quando nenhum id é informado', () => {

    before(async () => {
      const query = [[
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        }
      ]];

      sinon.stub(connection, 'query').returns(query);
    });

    after(async () => {
      connection.query.restore();
    });

    it('esperado que o retorno seja um array de objetos.', async () => {
      const result = await ModelProduct.getAll();

      expect(result).to.be.a('array');
    });

    it('esperado que os objetos tenham uma chave "id" e uma chave "name".', async () => {
      const result = await ModelProduct.getAll();

      result.map((product) => {
        expect(product).to.be.an('object').with.keys('id', 'name');
      })
    });
  });

  describe('quando um id é informado', () => {

    it('se houver um produto, retorna o produto.', async () => {
      const query = [[
        {
          "id": 1,
          "name": "Martelo de Thor"
        }
      ]];

      sinon.stub(connection, 'query').returns(query);

      const product = await ModelProduct.getById(1);

      expect(product).to.be.a('object');

      connection.query.restore();
    });

    it('se não houver o produto, retorna "undefined".', async () => {
      const query = [[undefined]];

      sinon.stub(connection, 'query').returns(query);

      const product = await ModelProduct.getById(5);

      expect(product).to.be.undefined;

      connection.query.restore();
    });
  });
});

describe('Retorna o produto criado', () => {
  const PRODUCT_NAME = 'Manopla do Thanos';

  before(async () => {
    const result = [{
      insertId: 4,
    }];

    sinon.stub(connection, 'query').resolves(result);;
  });

  after(async () => {
    connection.query.restore();
  });

  it('espera que o retorno seja um objeto e tenha as chaves "id" e "name".', async () => {
    const result = await ModelProduct.create(PRODUCT_NAME);

    expect(result).to.be.an('object').with.keys('id', 'name');
  });
});