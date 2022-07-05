const { expect } = require('chai');
const sinon = require('sinon');

const SalesModels = require('../../../models/modelSales');
const SalesServices = require('../../../services/servicesSales');

describe('Valida as compras recebidas', () => {
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