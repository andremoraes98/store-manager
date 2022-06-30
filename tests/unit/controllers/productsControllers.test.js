const { expect } = require('chai');
const sinon = require('sinon');

const ProductService = require('../../../services/servicesProducts');
const ProductController = require('../../../controllers/controllerProducts');

describe('Retorna todos os produtos', () => {
  describe('quando não é informado um "id"', () => {
    const req = {};
    const res = {};

    before(() => {
      const products = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        }
      ];

      sinon.stub(ProductService, 'getAll').resolves(products);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(products);
    });

    after(() => {
      ProductService.getAll.restore();
    });

    it('espera um status 200.', async () => {
      await ProductController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('espera retornar um json com os produtos.', async () => {
      const products = await ProductController.getAll(req, res);

      expect(products).to.be.a('array');
    });
  });

  describe('quando é informado um "id"', () => {
    const req = {};
    const res = {};

    before(() => {
      const products = {
        "id": 1,
        "name": "Martelo de Thor"
      };

      sinon.stub(ProductService, 'getById').resolves(products);

      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(products);
    });

    after(() => {
      ProductService.getById.restore();
    });

    it('espera um status 200.', async () => {
      await ProductController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('espera retornar um json com os produtos.', async () => {
      const products = await ProductController.getById(req, res);

      expect(products).to.be.a('object');
    });
  });

  describe('quando não é encontrado um produto com o "id".', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(ProductService, 'getById').resolves(undefined);

      req.params = { id: 10 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ message: 'Product not found' });
    });

    after(() => {
      ProductService.getById.restore();
    });

    it('espera um status 404.', async () => {
      await ProductController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it('espera retornar um json com os produtos.', async () => {
      const products = await ProductController.getById(req, res);

      expect(products).to.have.property('message');
    });
  })
});


describe('Cria um produto', () => {
  const req = {};
  const res = {};

  before(() => {
    const product = {
      id: 10,
      name: "Eu sou a Lenda"
    };

    sinon.stub(ProductService, 'create').resolves(product);

    req.body = {
      name: "Eu sou a Lenda"
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(product);
  });

  after(() => {
    ProductService.create.restore();
  });

  it('espera que seja retornado um código 201.', async () => {
    await ProductController.create(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
  });

  it('espera que o produto criado seja retornado.', async () => {
    const product = await ProductController.create(req, res);

    expect(product).to.be.a('object');
  });
})