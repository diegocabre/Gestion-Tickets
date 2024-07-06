const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class Comment {
  static async create(mensaje, id_usuario, id_ticket) {
    const result = await pool.query(
      "INSERT INTO comentarios (mensaje, id_usuario, id_ticket) VALUES ($1, $2, $3)",
      [mensaje, id_usuario, id_ticket]
    );
    return result.rows[0];
  }

  static async findByTicketId(id_ticket) {
    const result = await pool.query(
      "SELECT * FROM comentarios WHERE id_ticket = $1",
      [id_ticket]
    );
    return result.rows;
  }
}

module.exports = Comment;
