const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../data/db");

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

// Inicio de sesión - Mostrar formulario
router.get("/login", (req, res) => {
  res.render("login");
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user.id, tipo_usuario: user.tipo_usuario, nombre: user.nombre },
      "secret",
      { expiresIn: "1h" }
    );
    req.session.token = token;

    if (user.tipo_usuario === "estudiante") {
      res.redirect("/tickets/estudiante");
    } else if (user.tipo_usuario === "administrador") {
      res.redirect("/tickets/administrador");
    } else {
      res.redirect("/auth/login");
    }
  } else {
    res.redirect("/auth/login");
  }
});

// Middleware para roles de usuario
function checkRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.tipo_usuario === role) {
      next();
    } else {
      res.redirect("/auth/login");
    }
  };
}

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

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/tickets");
    }
    res.redirect("/auth/login");
  });
});

module.exports = { router, checkRole, isAuthenticated };
