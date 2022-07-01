/* eslint-disable camelcase */
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

const serialize = ({ date, product_id, quantity, sale_id }) => ({
    saleId: sale_id,
    productId: product_id,
    date,
    quantity,
  });

const getAll = async () => {
  const result = await ModelSales.getAll();

  return result.map(serialize);
};

module.exports = {
  create,
  productId,
  getAll,
};