const express = require('express');
const router = express.Router();
const adminController = require('./adminController');

// Admin routes
router.post('/add', adminController.addPizza);
router.put('/edit/:id', adminController.updatePizza);
router.delete('/delete/:id', adminController.deletePizza);

module.exports = router;
