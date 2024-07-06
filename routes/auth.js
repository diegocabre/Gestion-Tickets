const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../data/db"); // Importa el pool desde db.js

// Registro de usuario
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { nombre, email, password, tipo_usuario } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO usuarios (nombre, email, password, tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING id",
    [nombre, email, hashedPassword, tipo_usuario]
  );
  res.redirect("/auth/login");
});

// Inicio de sesión
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user.id, tipo_usuario: user.tipo_usuario },
      "secret",
      { expiresIn: "1h" }
    );
    req.session.token = token;
    res.redirect("/");
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
