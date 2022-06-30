const validateProductId = (req, res, next) => {
  const arrayOfProducts = req.body;

  const invalidProductId = arrayOfProducts
    .find((product) => product.productId !== undefined);
  
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

module.exports = {
  validateProductId,
  validateQuantity,
};