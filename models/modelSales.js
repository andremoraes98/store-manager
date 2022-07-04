const connection = require('./connection');

const create = async () => {
  const [result] = await connection.query(
    'INSERT INTO StoreManager.sales VALUES ();',
  );

  return result.insertId;
};

const createSaleProduct = async (arrayOfProduct) => {
  const saleId = await create();

  await Promise.all(arrayOfProduct.map(({ productId, quantity }) => connection
    .query(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
    )));

  return {
    id: saleId,
    itemsSold: arrayOfProduct,
  };
};

const getAll = async () => {
  const query = `
  SELECT
    sales_products.sale_id,
    sales.date,
    sales_products.product_id,
    sales_products.quantity
  FROM
    StoreManager.sales_products
  INNER JOIN
    StoreManager.sales
  ON
    sales_products.sale_id = sales.id
  ORDER BY
    sales_products.sale_id, sales_products.product_id`;
  
  const [result] = await connection.query(query);

  return result;
};

const getById = async (id) => {
  const [result] = await connection.query(
    `SELECT
      s.date,
      sp.product_id,
      sp.quantity
    FROM 
      StoreManager.sales as s
    INNER JOIN
      StoreManager.sales_products as sp
    ON
      s.id = sp.sale_id
    WHERE 
      sp.sale_id = ?`,
    [id],
  );

  return result;
};

const getSalesId = async () => {
  const [result] = await connection.query('SELECT id FROM StoreManager.sales');

  return result;
};

const deleteById = async (id) => {
  await connection.query(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [id],
  );
  await connection.query(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;',
    [id],
  );

  return null;
};

const updateById = async (saleId, arrayOfProduct) => {
  await Promise.all(arrayOfProduct.map(({ productId, quantity }) => connection
    .query(
      `UPDATE StoreManager.sales_products
      SET product_id = ?, quantity = ?
      WHERE sale_id = ? AND product_id = ?;`,
      [productId, quantity, saleId, productId],
    )));

  return {
    saleId,
    itemsUpdated: arrayOfProduct,
  };
};
  
module.exports = {
  createSaleProduct,
  getAll,
  getById,
  getSalesId,
  deleteById,
  updateById,
  create,
};