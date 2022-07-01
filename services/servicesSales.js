const ModelSales = require('../models/modelSales');

const create = async (arrayOfProduct) => {
  const sale = await ModelSales
    .createSaleProduct(arrayOfProduct);
  
  return sale;
};

const productIds = async () => {
  const allProducts = await ModelSales.getIdProducts();

  return (allProducts).map(({ id }) => id);
};

const serialize = ({ date, product_id: productId, quantity, sale_id: saleId }) => ({
    saleId,
    productId,
    date,
    quantity,
  });

const getAll = async () => {
  const result = await ModelSales.getAll();

  return result.map(serialize);
};

const getById = async (id) => {
  const result = await ModelSales.getById(id);

  return result.map(serialize);
};

module.exports = {
  create,
  productIds,
  getAll,
  getById,
};