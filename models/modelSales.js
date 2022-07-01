const connection = require('./connection');

const create = async () => {
  const [result] = await connection.query(
    'INSERT INTO StoreManager.sales VALUES ();',
  );

  return result.insertId;
};

const createSaleProduct = async (arrayOfProduct) => {
  const saleId = await create();

  arrayOfProduct.map(async ({ productId, quantity }) => {
    await connection.query(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
    );
  });

  return {
    id: saleId,
    itemsSold: arrayOfProduct,
  };
};

const getIdProducts = async () => {
  const [idProducts] = await connection
    .query('SELECT id FROM StoreManager.products');
  
  return idProducts;
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
    sales_products.sale_id = sales.id`;
  
  const result = await connection.query(query);

  return result;
};
  
module.exports = {
  createSaleProduct,
  getIdProducts,
  getAll,
};