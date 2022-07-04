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

const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await ServicesSales.getById(id);

  res.status(200).json(sales);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  await ServicesSales.deleteById(id);

  res.status(204).end();
};
  
module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};