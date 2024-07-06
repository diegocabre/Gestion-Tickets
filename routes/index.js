const express = require('express');
const router = express.Router();

// Ruta de inicio
router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;
