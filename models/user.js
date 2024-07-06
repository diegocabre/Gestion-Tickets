const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class User {
  static async create(nombre, email, password, tipo_usuario) {
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING id",
      [nombre, email, password, tipo_usuario]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }
}

module.exports = User;
