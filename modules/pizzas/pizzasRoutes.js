const express = require('express');
const router = express.Router();
const pizzasController = require('./pizzasController');

// Public routes (client)
router.get('/list', pizzasController.getAllPizzas);
router.get('/details/:id', pizzasController.getPizzaById);

module.exports = router;
