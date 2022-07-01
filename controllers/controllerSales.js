const ServicesSales = require('../services/servicesSales');

const create = async (req, res) => {
  const arrayOfProduct = req.body;

  const result = await ServicesSales.create(arrayOfProduct);
  
  return res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await ServicesSales.getAll();

  return res.status(200).json(result);
};
  
module.exports = {
  create,
  getAll,
};