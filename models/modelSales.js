const connection = require('./connection');

const create = async () => {
  const [result] = connection.query(
    'INSERT INTO StoreManager.sales VALUES ();',
  );

  return result.insertId;
};

const createProduct = async (arrayOfProduct) => {
  const saleId = await create();

  arrayOfProduct.map(async (product) => {
    await connection.query(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, product.productId, product.quantity],
    );
  });

  return {
    saleId,
    itemsSold: arrayOfProduct,
  };
};  
  
module.exports = {
  createProduct,
};