const ModelProduct = require('../models/modelProducts');

const getAll = async () => {
  const products = await ModelProduct.getAll();

  return products;
};

const getById = async (id) => {
  const product = await ModelProduct.getById(id);

  if (!product) return null;

  return product;
};

module.exports = {
  getAll,
  getById,
};