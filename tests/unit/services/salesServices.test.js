const { expect } = require('chai');
const sinon = require('sinon');

const SalesModels = require('../../../models/modelSales');
const ProductsModels = require('../../../models/modelProducts');
const SalesServices = require('../../../services/servicesSales');

describe('Valida as vendas recebidas', () => {
  describe('quando não é informado um "id"', () => {
    before(() => {
      const sales = [
        {
          saleId: 1,
          productId: 1,
          date: '2022-07-04T22:59:48.000Z',
          quantity: 5
        },
        {
          saleId: 1,
          productId: 2,
          date: '2022-07-04T22:59:48.000Z',
          quantity: 10
        },
        {
          saleId: 2,
          productId: 3,
          date: '2022-07-04T22:59:48.000Z',
          quantity: 15
        }
      ];

      sinon.stub(SalesModels, 'getAll').resolves(sales);
    });

    after(() => {
      SalesModels.getAll.restore();
    });

    it('espera que o retorno seja um array.', async () => {
      const sales = await SalesServices.getAll();

      expect(sales).to.be.a('array')
    });

    it('esperado que os objetos tenham chaves "saleId", "productId", "date" e "quantity".', async () => {
      const sales = await SalesServices.getAll();

      sales.map((sale) => {
        expect(sale).to.be.an('object').with.keys('saleId', 'productId', 'date', 'quantity');
      })
    });
  });

  describe('quando é informado um "id"', () => {
    before(() => {
      const sales = [
        {
          productId: 1,
          date: '2022-07-04T22:59:48.000Z',
          quantity: 5
        },
        {
          productId: 2,
          date: '2022-07-04T22:59:48.000Z',
          quantity: 10
        }
      ];

      sinon.stub(SalesModels, 'getById').resolves(sales);
    });

    after(() => {
      SalesModels.getById.restore();
    });

    it('espera que o retorno seja um array.', async () => {
      const sales = await SalesServices.getById(1);

      expect(sales).to.be.a('array');
    });

    it('espera que o retorno seja um objeto com as chaves "id" e "name".', async () => {
      const sales = await SalesServices.getById(1);

      sales.map((product) => {
        expect(product).to.be.an('object').with.keys('productId', 'date', 'quantity');
      })
    });
  });

  describe('quando não é encontrado um produto com o "id".', () => {
    before(() => sinon
      .stub(SalesModels, 'getById')
      .resolves(null));

    after(() => {
      SalesModels.getById.restore();
    });

    it('espera que seja retornado um valor "null".', async () => {
      const sale = await SalesModels.getById(3);

      expect(sale).to.be.null;
    });
  });
});

describe('Valida o produto criado', () => {
  const arrayOfProduct = {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 10
      },
      {
        productId: 2,
        quantity: 50
      }
    ]
  };

  before(() => {
    sinon.stub(SalesModels, 'createSaleProduct').resolves(arrayOfProduct);
  });

  after(() => {
    SalesModels.createSaleProduct.restore();
  });

  it('espera que o resultado seja um objeto com as chaves "id" e "itemsSold".', async () => {
    const product = await SalesServices.create(arrayOfProduct);

    expect(product).to.be.an('object').with.keys('id', 'itemsSold');
    expect(product.id).to.be.a('number');
    expect(product.itemsSold).to.be.an('array');
  });
});

describe('Valida o produto atualizado', () => {
  before(() => {
    const result = {
      saleId: 4,
      itemsUpdated: [
        {
          productId: 1,
          quantity: 10
        },
        {
          productId: 2,
          quantity: 50
        }
      ]
    };

    sinon.stub(SalesModels, 'updateById').resolves(result);
  })

  after(() => {
    SalesModels.updateById.restore();
  });

  it('espera que o retorno seja um objeto com as chaves "saleId" e "itemsUpdated".', async () => {
    const ID = 1;
    const arrayOfProduct = [
      {
        productId: 1,
        quantity: 10
      },
      {
        productId: 2,
        quantity: 50
      }
    ];

    const product = await SalesServices.updateById(ID, arrayOfProduct);

    expect(product).to.be.a('object').with.keys('saleId', 'itemsUpdated');
  });
});

describe('Retorna todos os ids de produtos existentes', () => {
  before(() => {
    const idProducts = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];

    sinon.stub(ProductsModels, 'getIdProducts').resolves(idProducts);
  })

  after(() => {
    ProductsModels.getIdProducts.restore();
  });

  it('espera que o retorno seja um "array".', async () => {
    const result = await SalesServices.productIds();

    expect(result).to.be.an('array');
  });
});

describe('Valida se o id da venda existe', () => {
  before(() => {
    const idSales = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];

    sinon.stub(SalesModels, 'getSalesId').resolves(idSales);
  })

  after(() => {
    SalesModels.getSalesId.restore();
  });

  it('se o id da venda existir, espera que o retorno seja "true".', async () => {
    const bool = await SalesServices.validSalesId(1);

    expect(bool).to.be.true;
  });

  it('se o id da venda não existir, espera que o retorno seja "false".', async () => {
    const bool = await SalesServices.validSalesId(99);

    expect(bool).to.be.false;
  });
});

describe('Valida se o id da venda existe', () => {
  before(() => {
    const idSales = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];

    sinon.stub(SalesModels, 'getSalesId').resolves(idSales);
  })

  after(() => {
    SalesModels.getSalesId.restore();
  });

  it('se o id da venda existir, espera que o retorno seja "true".', async () => {
    const bool = await SalesServices.validSalesId(1);

    expect(bool).to.be.true;
  });

  it('se o id da venda não existir, espera que o retorno seja "false".', async () => {
    const bool = await SalesServices.validSalesId(99);

    expect(bool).to.be.false;
  });
});

describe('Valida se a venda foi deletada', () => {
  before(() => {
    sinon.stub(SalesModels, 'deleteById');
  });

  after(() => {
    SalesModels.deleteById.restore();
  });

  it('e se a função não tem retorno.', async () => {
    const result = await SalesServices.deleteById(1);

    expect(result).to.be.null;
  });
});