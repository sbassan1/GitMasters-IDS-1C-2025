const { Pool } = require ("pg")

const express = require('express')
const app = express()
const port = 3000

// nodemon api.js
// localhost:3000

export const dbClient = new Pool ({
  user: "postgres",
  password : "postgres",
  port : 5432,
  database : "tiendaPC"
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
