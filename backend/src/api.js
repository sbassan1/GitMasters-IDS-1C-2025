const productosAPI = require('./scripts_bd/productos/productosAPI'); // Importar
const usuariosAPI = require('./scripts_bd/usuarios/usuariosAPI'); // Importar
const sedesAPI = require('./scripts_bd/sedes/sedesAPI'); // Importar
const ventasAPI = require('./scripts_bd/ventas/ventasAPI'); // Importar
const v_productosAPI = require('./scripts_bd/venta productos/v_productosAPI'); // Importar
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
app.use('/api/v1/usuarios', usuariosAPI);
app.use('/api/v1/sedes', sedesAPI);
app.use('/api/v1/ventas', ventasAPI);
app.use('/api/v1/ventas_productos', v_productosAPI);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


module.exports = {
  dbClient,
  app  // si también quieres exportar la app
};