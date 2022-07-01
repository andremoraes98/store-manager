const ModelSales = require('../models/modelSales');

const create = async (arrayOfProduct) => {
  const sale = await ModelSales
    .createSaleProduct(arrayOfProduct);
  
  return sale;
};

const productId = async () => {
  const allProducts = await ModelSales.getIdProducts();

  return (allProducts).map(({ id }) => id);
};

const getAll = async () => {
  const result = await ModelSales.getAll();

  return result;
};

module.exports = {
  create,
  productId,
  getAll,
};