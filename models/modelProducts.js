const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
    .query('SELECT * FROM StoreManager.products');
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection.query(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const getIdProducts = async () => {
  const [idProducts] = await connection
    .query('SELECT id FROM StoreManager.products');

  return idProducts;
};

const create = async (name) => {
  const [result] = await connection.query(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  return {
    id: result.insertId,
    name,
  };
};

const update = async (name, id) => {
  await connection.query(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [name, id],
  );

  return {
    id,
    name,
  };
};

const deleteById = async (id) => {
  await connection.query(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );

  return null;
};

const searchByTerm = async (term) => {
  const [result] = await connection.query(
    `SELECT * FROM StoreManager.products WHERE name LIKE "%${term}%";`,
  );

  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  getIdProducts,
  deleteById,
  searchByTerm,
};