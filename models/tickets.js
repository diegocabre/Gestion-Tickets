const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class Ticket {
  static async create(descripcion, id_usuario, id_tipo) {
    const result = await pool.query(
      "INSERT INTO tickets (descripcion, fecha_creacion, fecha_modificacion, id_usuario, id_tipo) VALUES ($1, NOW(), NOW(), $2, $3)",
      [descripcion, id_usuario, id_tipo]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query("SELECT * FROM tickets");
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM tickets WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }
}

module.exports = Ticket;
