const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const app = express();
const ControllerProducts = require('./controllers/controllerProducts');
const MiddlewaresProducts = require('./middlewares/middlewareProducts');
const ControllerSales = require('./controllers/controllerSales');
const MiddlewaresSales = require('./middlewares/middlewareSales');

app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ControllerProducts.getAll);

app.get('/products/search', ControllerProducts.searchByTerm);

app.get('/products/:id', ControllerProducts.getById);

app.post('/products',
  MiddlewaresProducts.validateName,
  MiddlewaresProducts.validateNameLength,
  ControllerProducts.create);

app.post('/sales',
  MiddlewaresSales.validateProductId,
  MiddlewaresSales.validateQuantity,
  MiddlewaresSales.validateQuantityLength,
  MiddlewaresSales.validateIfProductExists,
  ControllerSales.create);

app.get('/sales', ControllerSales.getAll);

app.get('/sales/:id',
  MiddlewaresSales.validateIfSalesIdExists,
  ControllerSales.getById);

app.put('/products/:id',
  MiddlewaresProducts.validateName,
  MiddlewaresProducts.validateNameLength,
  MiddlewaresProducts.validateId,
  ControllerProducts.update);

app.delete('/products/:id',
  MiddlewaresProducts.validateId,
  ControllerProducts.deleteById);

app.delete('/sales/:id',
  MiddlewaresSales.validateIfSalesIdExists,
  ControllerSales.deleteById);

app.put('/sales/:id',
  MiddlewaresSales.validateProductId,
  MiddlewaresSales.validateQuantity,
  MiddlewaresSales.validateQuantityLength,
  MiddlewaresSales.validateIfProductExists,
  MiddlewaresSales.validateIfSalesIdExists,
  ControllerSales.updateById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;