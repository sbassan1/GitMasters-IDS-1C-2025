const { Pool } = require("pg");
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log("DATABASE_URL:", process.env.DATABASE_URL);


const dbClient = new Pool({
  /* user: "postgres",
  password: "postgres",
  port: 5432,
  database: "tiendaPC" */
  connectionString: process.env.DATABASE_URL,
});

module.exports = dbClient;