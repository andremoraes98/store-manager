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
    saleId,
    itemsSold: arrayOfProduct,
  };
};  
  
module.exports = {
  createSaleProduct,
};