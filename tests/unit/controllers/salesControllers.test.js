const { expect } = require('chai');
const sinon = require('sinon');

const SalesService = require('../../../services/servicesSales');
const SalesController = require('../../../controllers/controllerSales');

describe('Cria uma venda', () => {
  const req = {};
  const res = {};

  before(() => {
    const result = {
      id: 4,
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
    const body = [
      {
        productId: 1,
        quantity: 10
      },
      {
        productId: 2,
        quantity: 50
      }
    ];

    sinon.stub(SalesService, 'create').resolves(result);
    req.body = { body };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(result);
  });

  after(() => {
    SalesService.create.restore();
  });

  it('espera que seja retornado um status 201.', async () => {
    await SalesController.create(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
  });

  it('espera que o objeto criado seja retornado com as chaves "id" e "itemsSols".', async () => {
    const result = await SalesController.create(req, res);

    expect(result).to.be.an('object').with.keys('id', 'itemsSold')
  });
});

describe('Retorna todas as vendas', () => {
  const req = {};
  const res = {};

  before(() => {
    const result = [
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
      },
    ];

    sinon.stub(SalesService, 'getAll').resolves(result);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(result);
  });

  after(() => {
    SalesService.getAll.restore();
  });

  it('espera que seja retornado um status 200.', async () => {
    await SalesController.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('espera que seja retornado um "array".', async () => {
    const result = await SalesController.getAll(req, res);

    expect(result).to.be.an('array');
  });

  it('espera que os objetos contidos no "array" tenham as chaves "saleId", "produdctId", "date" e "quatity".', async () => {
    const result = await SalesController.getAll(req, res);

    result.map((product) => {
      expect(product).to.be.an('object').with.keys('saleId', 'productId', 'date', 'quantity');
    });
  });
});

describe('Retorna uma venda', () => {
  describe('quando o id é informado', () => {
    const req = {};
    const res = {};
  
    before(() => {
      const result = [
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
  
      sinon.stub(SalesService, 'getById').resolves(result);
      req.params = {
        id: 1,
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(result);
    });
  
    after(() => {
      SalesService.getById.restore();
    });

    it('espera que seja retornado um status 200.', async () => {
      await SalesController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('espera que seja retornado um "array".', async () => {
      const result = await SalesController.getById(req, res);

      expect(result).to.be.an('array');
    });

    it('espera que os objetos contidos no "array" tenham as chaves "saleId", "produdctId", "date" e "quatity".', async () => {
      const result = await SalesController.getById(req, res);

      result.map((product) => {
        expect(product).to.be.an('object').with.keys('productId', 'date', 'quantity');
      });
    });
  });
});

describe('Deleta uma venda', () => {
  const req = {};
  const res = {};

  before(() => {
    sinon.stub(SalesService, 'deleteById').resolves();
    req.params = {
      id: 1,
    }
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub();
  });

  after(() => {
    SalesService.deleteById.restore();
  });

  it('espera que seja retornado um código 204.', async () => {
    await SalesController.deleteById(req, res);

    expect(res.status.calledWith(204)).to.be.equal(true);
  });
});

describe('Atualiza uma venda', () => {
  const req = {};
  const res = {};

  before(() => {
    const result = {
      saleId: 2,
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
    const body = [
      {
        productId: 1,
        quantity: 10
      },
      {
        productId: 2,
        quantity: 50
      }
    ];

    sinon.stub(SalesService, 'updateById').resolves(result);
    req.params = { 
      id: 1,
    };
    req.body = { body };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(result);
  });

  after(() => {
    SalesService.updateById.restore();
  });

  it('espera que seja retornado um status 200.', async () => {
    await SalesController.updateById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('espera que o objeto criado seja retornado com as chaves "saleId" e "itemsUpdated".', async () => {
    const result = await SalesController.updateById(req, res);

    expect(result).to.be.an('object').with.keys('saleId', 'itemsUpdated');
  });
});