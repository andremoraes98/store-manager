const { expect } = require('chai');
const sinon = require('sinon');

const ModelProduct = require('../../../models/modelProducts');
const ServiceProduct = require('../../../services/servicesProducts');

const PRODUCT_NAME = 'Manopla do Thanos';
const defaultProduct = {
  id: 5,
  name: PRODUCT_NAME,
};

describe('Valida os produtos recebidos', () => {
  describe('quando não é informado um "id"', () => {
    before(async () => {
      const products = [
        {
          id: 1,
          name: 'Martelo de Thor',
        },
        {
          id: 3,
          name: 'Escudo do Capitão América',
        },
        {
          id: 2,
          name: 'Traje de encolhimento',
        },
      ];

      sinon.stub(ModelProduct, 'getAll').resolves(products);
    });
    
    after(async () => {
      ModelProduct.getAll.restore();
    });

    it('espera que o retorno seja um array.', async () => {
      const products = await ServiceProduct.getAll();

      expect(products).to.be.a('array')
    });

    it('esperado que os objetos tenham uma chave "id" e uma chave "name".', async () => {
      const products = await ServiceProduct.getAll();

      products.map((product) => {
        expect(product).to.be.an('object').with.keys('id', 'name');
      })
    });

    it('esperado que o array esteja ordenado pelo "id".', async () => {
      const products = await ServiceProduct.getAll();

      expect(products[0].id).to.be.equals(1);
      expect(products[1].id).to.be.equals(2);
      expect(products[2].id).to.be.equals(3);
    })
  });

  describe('quando é informado um "id"', () => {
    before(async () => {
      const product = {
        id: 3,
        name: "Escudo do Capitão América"
      };

      sinon.stub(ModelProduct, 'getById').resolves(product);
    });

    after(async () => {
      ModelProduct.getById.restore();
    });

    it('espera que o retorno seja um objeto com as chaves "id" e "name".', async () => {
      const product = await ServiceProduct.getById(3);

      expect(product).to.be.a('object').with.keys('id', 'name');
    });
  });

  describe('quando não é encontrado um produto com o "id".', () => {
    before(async () => sinon
      .stub(ModelProduct, 'getById')
      .resolves(undefined));

    after(async () => {
      ModelProduct.getById.restore();
    });

    it('espera que seja retornado um valor "null".', async () => {
      const product = await ServiceProduct.getById(3);

      expect(product).to.be.null;
    });
  });
});

describe('Valida o produto criado', () => {
  before(async () => {
    sinon.stub(ModelProduct, 'create').resolves(defaultProduct);
  });

  after(async () => {
    ModelProduct.create.restore();
  });

  it('espera que o retorno seja um objeto com as chaves "id" e "name".', async () => {
    const product = await ServiceProduct.create(PRODUCT_NAME);

    expect(product).to.be.a('object').with.keys('id', 'name');
  });
});

describe('Valida o produto atualizado', () => {
  before(async () => {
    sinon.stub(ModelProduct, 'update').resolves(defaultProduct);
  })

  after(async () => {
    ModelProduct.update.restore();
  });

  it('espera que o retorno seja um objeto com as chaves "id" e "name".', async () => {
    const product = await ServiceProduct.update(PRODUCT_NAME);

    expect(product).to.be.a('object').with.keys('id', 'name');
  });
});

describe('Valida se o id do produto passado existe', () => {
  before(async () => {
    const idProducts = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];

    sinon.stub(ModelProduct, 'getIdProducts').resolves(idProducts);
  })

  after(async () => {
    ModelProduct.getIdProducts.restore();
  });

  it('espera que o retorno "true", caso exista.', async () => {
    const VALID_ID = 1;
    const result = await ServiceProduct.validId(VALID_ID);

    expect(result).to.be.true;
  });

  it('espera que o retorno "false", caso não exista.', async () => {
    const INVALID_ID = 99;
    const result = await ServiceProduct.validId(INVALID_ID);

    expect(result).to.be.false;
  });
});

describe('Valida se o produto foi deletado', () => {
  before(() => {
    sinon.stub(ModelProduct, 'deleteById');
  });

  after(() => {
    ModelProduct.deleteById.restore();
  });

  it('e se a função não tem retorno.', async () => {
    const result = await ServiceProduct.deleteById(1);

    expect(result).to.be.undefined;
  });
});

describe('Valida se o produto filtrado é retornado', () => {
  before(() => {
    const product = [
      {
        id: 1,
        name: 'Martelo de Thor',
      }
    ];
    sinon.stub(ModelProduct, 'searchByTerm').resolves(product);
  });

  after(() => {
    ModelProduct.searchByTerm.restore();
  });

  it('espera que seja retornado um "array".', async () => {
    const result = await ServiceProduct.searchByTerm('Mart');

    expect(result).to.be.an('array');
  });

  it('espera que o conteúdo do "array" sejam objetos com chaves "id" e "name".', async () => {
    const result = await ServiceProduct.searchByTerm('Mart');

    result.map((product) => {
      expect(product).to.be.an('object').with.keys('id', 'name')
    });
  });
});