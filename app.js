const express = require('express');

const app = express();
const ControllerProducts = require('./controllers/controllerProducts');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ControllerProducts.getAll);

app.get('/products/:id', ControllerProducts.getById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;