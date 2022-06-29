const ModelProduct = require('../models/modelProducts');

const getAll = async () => {
  const products = await ModelProduct.getAll();
  const sortedProducts = products.sort((a, b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });

  return sortedProducts;
};

const getById = async (id) => {
  const product = await ModelProduct.getById(id);

  if (!product) return null;

  return product;
};

const create = async (name) => {
  const product = await ModelProduct.create(name);

  return product;
};

module.exports = {
  getAll,
  getById,
  create,
};