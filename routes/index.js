const express = require("express");
const router = express.Router();

// Definición de rutas
router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
