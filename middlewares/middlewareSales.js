const ServiceSale = require('../services/servicesSales');

const validateProductId = async (req, res, next) => {
  const arrayOfProducts = req.body;

  const invalidProductId = arrayOfProducts
    .find(({ productId }) => productId !== undefined);
  
  if (!invalidProductId) {
    return res
      .status(400)
      .json({ message: '"productId" is required' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const arrayOfProducts = req.body;

  const invalidQuantity = arrayOfProducts
    .find(({ quantity }) => quantity !== undefined);

  if (!invalidQuantity) {
    return res
      .status(400)
      .json({ message: '"quantity" is required' });
  }

  next();
};

const validateQuantityLength = (req, res, next) => {
  const arrayOfProducts = req.body;

  const invalidQuantity = arrayOfProducts
    .find(({ quantity }) => quantity > 0);

  if (!invalidQuantity) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validateIfProductExists = async (req, res, next) => {
  const arrayOfProducts = req.body;
  const idProducts = await ServiceSale.productIds();

  const productIdNotFind = arrayOfProducts
    .find(({ productId }) => !(idProducts.includes(productId)));

  if (productIdNotFind) {
    return res
      .status(404)
      .json({ message: 'Product not found' });
  }

  next();
};

const validateIfSalesIdExists = async (req, res, next) => {
  const { id } = req.params;
  const isSaleIdValid = await ServiceSale.validSalesId(id);

  if (!isSaleIdValid) {
    return res
      .status(404)
      .json({ message: 'Sale not found' });
  }

  next();
};

module.exports = {
  validateProductId,
  validateQuantity,
  validateQuantityLength,
  validateIfProductExists,
  validateIfSalesIdExists,
};