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
    const tipoId = parseInt(id_tipo, 10);
    if (isNaN(tipoId)) {
      throw new Error("id_tipo debe ser un número entero");
    }

    await pool.query(
      "INSERT INTO tickets (descripcion, id_usuario, id_tipo) VALUES ($1, $2, $3)",
      [descripcion, req.user.id, tipoId]
    );
    res.redirect("/tickets/estudiante"); // Redirige a la vista de tickets del estudiante
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    res.status(500).send("Error al crear el ticket.");
  }
});

// Listar tickets para estudiantes
router.get("/estudiante", checkRole("estudiante"), async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT tickets.*, usuarios.nombre AS usuario_nombre FROM tickets JOIN usuarios ON tickets.id_usuario = usuarios.id WHERE tickets.id_usuario = $1",
      [req.user.id]
    );
    res.render("estudiante", { tickets: result.rows, user: req.user });
  } catch (error) {
    console.error("Error al listar tickets para estudiante:", error);
    res.status(500).send("Error al listar tickets para estudiante.");
  }
});

// Listar tickets para administradores
router.get("/administrador", checkRole("administrador"), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT tickets.id, tickets.descripcion, tickets.fecha_creacion, tickets.auditado, 
              usuarios.nombre AS estudiante_nombre 
       FROM tickets 
       JOIN usuarios ON tickets.id_usuario = usuarios.id`
    );
    res.render("administrador", { tickets: result.rows, user: req.user });
  } catch (error) {
    console.error("Error al listar tickets para administrador:", error);
    res.status(500).send("Error al listar tickets para administrador.");
  }
});

// Ruta para eliminar un ticket
router.post("/:id/delete", checkRole("administrador"), async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);

  try {
    // Elimina primero los comentarios relacionados
    await pool.query("DELETE FROM comentarios WHERE id_ticket = $1", [
      ticketId,
    ]);

    // Luego elimina el ticket
    await pool.query("DELETE FROM tickets WHERE id = $1", [ticketId]);
    res.json({ success: true }); // Devuelve una respuesta JSON de éxito
  } catch (error) {
    console.error("Error al eliminar el ticket:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al eliminar el ticket" });
  }
});

// Actualizar el estado auditado del ticket y notificar al estudiante
router.post("/:id/auditado", checkRole("administrador"), async (req, res) => {
  const { id } = req.params;
  const { auditado } = req.body; // auditado debe ser 'true' o 'false'

  try {
    const auditadoBoolean = auditado === "true";

    await pool.query("UPDATE tickets SET auditado = $1 WHERE id = $2", [
      auditadoBoolean,
      id,
    ]);

    const ticketResult = await pool.query(
      "SELECT id_usuario FROM tickets WHERE id = $1",
      [id]
    );
    const userId = ticketResult.rows[0].id_usuario;

    await pool.query(
      "INSERT INTO notificaciones (id_usuario, mensaje) VALUES ($1, $2)",
      [userId, `Tu ticket con ID ${id} ha sido auditado.`]
    );

    res.redirect("/tickets/administrador"); // Redirige a la vista de tickets del administrador
  } catch (error) {
    console.error(
      "Error al actualizar el estado del ticket y notificar al estudiante:",
      error
    );
    res
      .status(500)
      .send(
        "Error al actualizar el estado del ticket y notificar al estudiante."
      );
  }
});

// Ruta para ver detalles del ticket
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id, 10);
    if (isNaN(ticketId)) {
      return res
        .status(400)
        .render("error", { message: "ID de ticket no válido" });
    }

    const ticketResult = await pool.query(
      "SELECT tickets.*, usuarios.nombre AS usuario_nombre FROM tickets JOIN usuarios ON tickets.id_usuario = usuarios.id WHERE tickets.id = $1",
      [ticketId]
    );

    if (ticketResult.rows.length === 0) {
      return res
        .status(404)
        .render("error", { message: "Ticket no encontrado" });
    }

    const ticket = ticketResult.rows[0];
    res.render("ticket-detail", { ticket, user: req.user });
  } catch (error) {
    console.error("Error al obtener el ticket:", error);
    res.status(500).render("error", { message: "Error al obtener el ticket" });
  }
});

// Ruta para ver el formulario de nuevo comentario
router.get("/:id/comments/new", isAuthenticated, async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);

  if (isNaN(ticketId)) {
    return res
      .status(400)
      .render("error", { message: "ID de ticket no válido" });
  }

  try {
    // Verificar que el ticket existe
    const ticketResult = await pool.query(
      "SELECT * FROM tickets WHERE id = $1",
      [ticketId]
    );

    if (ticketResult.rows.length === 0) {
      return res
        .status(404)
        .render("error", { message: "Ticket no encontrado" });
    }

    // Renderizar la vista del formulario de nuevo comentario
    res.render("new-comment", { ticketId });
  } catch (error) {
    console.error("Error al obtener el ticket:", error);
    res.status(500).render("error", { message: "Error al obtener el ticket" });
  }
});

// Ruta para ver los comentarios de un ticket
router.get("/:id/comments", isAuthenticated, async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);

  try {
    const result = await pool.query(
      "SELECT * FROM comentarios WHERE id_ticket = $1",
      [ticketId]
    );
    const comentarios = result.rows;
    res.render("comments", { comentarios, ticketId });
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    res
      .status(500)
      .render("error", { message: "Error al obtener los comentarios" });
  }
});

// Ruta para agregar un comentario a un ticket
router.post("/:id/comment", checkRole("administrador"), async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);
  const { mensaje } = req.body;
  const userId = req.user.id; // Obtén el ID del usuario desde la sesión

  try {
    await pool.query(
      "INSERT INTO comentarios (mensaje, id_ticket, id_usuario) VALUES ($1, $2, $3)",
      [mensaje, ticketId, userId]
    );
    res.redirect(`/tickets/${ticketId}/comments`); // Redirige a la vista de comentarios del ticket
  } catch (error) {
    console.error("Error al agregar el comentario:", error);
    res
      .status(500)
      .render("error", { message: "Error al agregar el comentario" });
  }
});

module.exports = router;
