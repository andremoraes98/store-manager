const ModelSales = require('../models/modelSales');
const ModelProducts = require('../models/modelProducts');

const create = async (arrayOfProduct) => {
  const sale = await ModelSales
    .createSaleProduct(arrayOfProduct);
  
  return sale;
};

const productIds = async () => {
  const allProducts = await ModelProducts.getIdProducts();

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

  return result
    .map(serialize)
    .map(({ date, productId, quantity }) => ({ productId, date, quantity }));
};

const validSalesId = async (saleId) => {
  const result = await ModelSales.getSalesId();

  return result.map(({ id }) => id).includes(Number(saleId));
};

const deleteById = async (id) => {
  await ModelSales.deleteById(id);

  return null;
};

const updateById = async (id, arrayOfProduct) => {
  const result = await ModelSales.updateById(id, arrayOfProduct);

  return result;
};

module.exports = {
  create,
  productIds,
  getAll,
  getById,
  validSalesId,
  deleteById,
  updateById,
};