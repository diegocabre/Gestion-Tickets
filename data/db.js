const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // Desactivar SSL
});

//test connection
pool
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

module.exports = pool;
