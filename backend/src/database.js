const { Pool } = require("pg");

const dbClient = new Pool({
  user: "postgres",
  password: "postgres",
  port: 5432,
  database: "tiendaPC"
});

module.exports = dbClient;