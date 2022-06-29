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

module.exports = {
  getAll,
  getById,
  create,
};