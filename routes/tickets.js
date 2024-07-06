const express = require("express");
const router = express.Router();
const pool = require("../data/db"); // Importa el pool desde db.js
const jwt = require("jsonwebtoken");

// Middleware de autenticación
function isAuthenticated(req, res, next) {
  const token = req.session.token;
  if (!token) {
    return res.redirect("/auth/login");
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.redirect("/auth/login");
    }
    req.user = decoded;
    next();
  });
}

// Listar tickets
router.get("/", isAuthenticated, async (req, res) => {
  const result = await pool.query("SELECT * FROM tickets");
  res.render("tickets", { tickets: result.rows });
});

// Crear nuevo ticket
router.get("/new", isAuthenticated, (req, res) => {
  res.render("new_ticket");
});

router.post("/new", isAuthenticated, async (req, res) => {
  const { descripcion, id_tipo } = req.body;
  await pool.query(
    "INSERT INTO tickets (descripcion, fecha_creacion, fecha_modificacion, id_usuario, id_tipo) VALUES ($1, NOW(), NOW(), $2, $3)",
    [descripcion, req.user.id, id_tipo]
  );
  res.redirect("/tickets");
});

// Ver detalles de ticket
router.get("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const ticketResult = await pool.query("SELECT * FROM tickets WHERE id = $1", [
    id,
  ]);
  const commentResult = await pool.query(
    "SELECT * FROM comentarios WHERE id_ticket = $1",
    [id]
  );
  res.render("ticket_details", {
    ticket: ticketResult.rows[0],
    comments: commentResult.rows,
  });
});

// Crear nuevo comentario
router.post("/:id/comment", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { mensaje } = req.body;
  await pool.query(
    "INSERT INTO comentarios (mensaje, id_usuario, id_ticket) VALUES ($1, $2, $3)",
    [mensaje, req.user.id, id]
  );
  res.redirect(`/tickets/${id}`);
});

module.exports = router;
