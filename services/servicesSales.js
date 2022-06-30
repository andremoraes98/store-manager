const ModelSales = require('../models/modelSales');

const create = async (arrayOfProduct) => {
  const sale = await ModelSales
    .createSaleProduct(arrayOfProduct);
  
  return sale;
};

module.exports = {
  create,
};