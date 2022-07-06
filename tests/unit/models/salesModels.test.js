const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const ModelSales = require('../../../models/modelSales');

describe('Retorna o ID da venda criada', () => {
  before(async () => {
    const result = [{
      insertId: 1,
    }];
    sinon.stub(connection, 'query').resolves(result);
  });

  after(async () => {
    connection.query.restore();
  });

  it('espera que um número seja retornado', async () => {
    const result = await ModelSales.create();

    expect(result).to.be.a('number');
    expect(result).to.be.equal(1);
  });  
});

describe('Retorna o ID da venda e os produtos criados', () => {
  before(() => {
    const result = [{
      insertId: 1,
    }];

    sinon.stub(connection, 'query').resolves(result);
    sinon.stub(ModelSales, 'create');
  });

  after(() => {
    ModelSales.create.restore();
    connection.query.restore();
  });

  it('espera que seja retornado um objeto com as chaves "id" e "itemSold".', async () => {
    const createSale = [
      {
        productId: 1,
        quantity: 10
      },
      {
        productId: 2,
        quantity: 50
      },
    ];

    const result = await ModelSales.createSaleProduct(createSale);

    expect(result).to.be.an('object').with.keys('id', 'itemsSold');
  });

});

describe('Retorna todas as vendas efetuadas', () => {
  const sales = [[
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
  ]];

  before(() => {
    sinon.stub(connection, 'query').resolves(sales);
  });

  after(() => {
    connection.query.restore();
  });

  it('espera que retorne um array de objetos com as chaves "saleId", "productId", "date" e "quantity".', async () => {
    const result = await ModelSales.getAll();

    expect(result).to.be.an('array');

    result.forEach((sale) => {
      expect(sale).to.be.an('object').with.keys('saleId', 'productId', 'date', 'quantity');
    });
  });

  
});

describe('Retorna todas as vendas efetuadas', () => {
  const sales = [[
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
  ]];

  before(() => {
    sinon.stub(connection, 'query').resolves(sales);
  });

  after(() => {
    connection.query.restore();
  });

  it('espera que retorne um array de objetos com as chaves "productId", "date" e "quantity".', async () => {
    const result = await ModelSales.getById(1);

    expect(result).to.be.an('array');

    result.forEach((sale) => {
      expect(sale).to.be.an('object').with.keys('productId', 'date', 'quantity');
    });
  });


});

describe('Retorna os ids das vendas', () => {
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
    const idSales = await ModelSales.getSalesId();

    expect(idSales).to.be.a('array');
    idSales.forEach((idObject) => expect(idObject).to.be.a('object').with.key('id'));
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
    const result = await ModelSales.deleteById(1);

    expect(result).to.be.null;
  })
});

describe('Atualiza um produto', () => {
  describe('espera que seja retornado um objeto', () => {
    before(() => {
      sinon.stub(connection, 'query');
    });

    after(() => {
      connection.query.restore();
    });

    it('que tenha uma chave "saleId" e "itemsUpdated".', async () => {
      const ID = '1';
      const createSale = [
        {
          productId: 1,
          quantity: 99,
        },
        {
          productId: 2,
          quantity: 99,
        },
      ];

      const result = await ModelSales.updateById(ID, createSale);

      expect(result).to.be.a('object').with.keys('saleId', 'itemsUpdated');
    });
  });
});