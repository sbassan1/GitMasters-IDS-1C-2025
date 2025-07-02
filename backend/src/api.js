const productosAPI = require('./scripts_bd/productosAPI'); // Importar
const express = require('express');



const app = express();
const port = 3000

// nodemon api.js
// localhost:3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const dbClient = require('./database');

// Prefijos de las API 

app.use(express.json()); // Importante para recibir JSON

app.use('/api/v1/productos', productosAPI);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


module.exports = {
  dbClient,
  app  // si también quieres exportar la app
};