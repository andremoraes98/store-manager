const ServicesSales = require('../services/servicesSales');

const create = async (req, res) => {
  const arrayOfProduct = req.body;

  const result = await ServicesSales.create(arrayOfProduct);
  
  return res.status(201).json(result);
};
  
module.exports = {
  create,
};