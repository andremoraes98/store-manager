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

const update = async (name, id) => {
  const result = await ModelProduct.update(name, id);
  
  return result;
};

const validId = async (productId) => {
  const ids = await ModelProduct.getIdProducts();

  return ids.map(({ id }) => id).includes(Number(productId));
};

const deleteById = async (id) => {
  await ModelProduct.deleteById(id);
};

const searchByTerm = async (term) => {
  const result = await ModelProduct.searchByTerm(term);

  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  validId,
  deleteById,
  searchByTerm,
};