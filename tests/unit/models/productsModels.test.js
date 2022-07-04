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

describe('Retorna os ids dos produtos', () => {
  before(() => {
    const result = [[
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(() => {
    connection.query.restore();
  });

  it('espera que seja retornado um array de objetos com a chave "id".', async () => {
    const idProducts = await ModelProduct.getIdProducts();

    expect(idProducts).to.be.a('array');
    idProducts.forEach((idObject) => expect(idObject).to.be.a('object').with.key('id'));
  });
});

describe('Atualiza um produto', () => {
  describe('espera que seja retornado um objeto', () => {
    before(() => {
      sinon.stub(connection, 'query');
    });

    after(() => {
      connection.query.restore();
    });

    it('que tenha uma chave "id" e "name".', async () => {
      const NAME = 'Manopla do Thanos';
      const ID = '1';

      const result = await ModelProduct.update(NAME, ID);

      expect(result).to.be.a('object').with.keys('id', 'name');
    });
  });
});

describe('Deleta um produto', () => {
  before(() => {
    sinon.stub(connection, 'query');
  });

  after(() => {
    connection.query.restore();
  });

  it('espera que um null seja retornado.', async () => {
    const result = await ModelProduct.deleteById(1);

    expect(result).to.be.null;
  })
});

describe('Filtra um produto por um termo', () => {
  describe('quando chamado com "mart"', () => {
    before(() => {
      const result = [[{
        id: 1,
        name: 'Martelo do Thor',
      }]];

      sinon.stub(connection, 'query').resolves(result);
    });

    after(() => {
      connection.query.restore();
    });

    it('espera que seja retornado um objeto com chave "id" e "name".', async () => {
      const result = await ModelProduct.searchByTerm('mart');

      expect(result).to.be.a('array');
      expect(result[0]).to.be.a('object').with.keys('id', 'name');
      expect(result[0].id).to.be.equal(1);
      expect(result[0].name).to.be.equal('Martelo do Thor');
    })
  });
});