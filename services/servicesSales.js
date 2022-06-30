const ModelSales = require('../models/modelSales');

const create = async (arrayOfProduct) => {
  const sale = await ModelSales
    .createSaleProduct(arrayOfProduct);
  
  return sale;
};

const isProductIdValid = async (productId) => {
  const allProducts = await ModelSales.getIdProducts();

  return allProducts.includes(productId);
};

module.exports = {
  create,
  isProductIdValid,
};