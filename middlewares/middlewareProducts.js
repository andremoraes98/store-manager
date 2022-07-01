const ServiceProducts = require('../services/servicesProducts');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: '"name" is required' });
  }

  next();
};

const validateNameLength = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const validateId = async (req, res, next) => {
  const { id } = req.params;

  const isIdValid = await ServiceProducts.validProductId(id);

  if (!isIdValid) {
    return res
      .status(404)
      .json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateName,
  validateNameLength,
  validateId,
};