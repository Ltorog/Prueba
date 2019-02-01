const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

// Index
router.get('/', studentsController.list);

module.exports = router;