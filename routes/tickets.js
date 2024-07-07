const express = require("express");
const router = express.Router();
const pool = require("../data/db");
const { checkRole, isAuthenticated } = require("./auth");

// Middleware de autenticación
router.use(isAuthenticated);

// Mostrar el formulario de creación de ticket
router.get("/new", checkRole("estudiante"), async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tipos"); // Obtener tipos de tickets
    res.render("new_ticket", { tipos: result.rows });
  } catch (error) {
    console.error("Error al obtener tipos de tickets:", error);
    res
      .status(500)
      .send("Error al cargar el formulario de creación de ticket.");
  }
});

// Crear un nuevo ticket
router.post("/new", checkRole("estudiante"), async (req, res) => {
  const { descripcion, id_tipo } = req.body;

  console.log("Descripción:", descripcion); // Imprime la descripción
  console.log("ID Tipo:", id_tipo); // Imprime el ID del tipo de ticket

  try {
    await pool.query(
      "INSERT INTO tickets (descripcion, id_usuario, id_tipo) VALUES ($1, $2, $3)",
      [descripcion, req.user.id, id_tipo]
    );
    res.redirect("/tickets/estudiante"); // Redirige a la vista de tickets del estudiante
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    res.status(500).send("Error al crear el ticket.");
  }
});

// Listar tickets para estudiantes
router.get("/estudiante", checkRole("estudiante"), async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tickets WHERE id_usuario = $1",
    [req.user.id]
  );
  res.render("estudiante", { tickets: result.rows, user: req.user });
});

// Listar tickets para administradores
router.get("/administrador", checkRole("administrador"), async (req, res) => {
  const result = await pool.query("SELECT * FROM tickets");
  res.render("administrador", { tickets: result.rows, user: req.user });
});

// Eliminar un ticket
router.delete("/:id", checkRole("administrador"), async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tickets WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
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
    user: req.user,
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
