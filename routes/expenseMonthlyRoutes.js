const express = require('express');

const router = express.Router();

// Import the controller function
const { expenseMonthlyController } = require('../controllers/expenseMonthlyController');
router.get('/', expenseMonthlyController);

module.exports = router;