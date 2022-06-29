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

    it('esperado que os objetos tenham uma chave "id".', async () => {
      const result = await ModelProduct.getAll();

      result.map((product) => {
        expect(product).to.have.property('id');
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