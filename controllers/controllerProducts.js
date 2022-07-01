const ServiceProducts = require('../services/servicesProducts');

const getAll = async (_req, res) => {
  const products = await ServiceProducts.getAll();

  return res.status(200).json(products);  
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await ServiceProducts.getById(id);

  if (!product) {
    return res
      .status(404)
      .json({ message: 'Product not found' });
  }
  
  return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name } = req.body;
  const product = await ServiceProducts.create(name);

  return res.status(201).json(product);  
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await ServiceProducts.update(name, id);

  return res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  await ServiceProducts.deleteById(id);

  res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};