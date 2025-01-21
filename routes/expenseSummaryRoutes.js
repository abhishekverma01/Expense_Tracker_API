const express = require('express');
const router = express.Router();

// Import The Controller function
const { expenseSummaryController } = require('../controllers/expenseSummaryController')

router.get('/', expenseSummaryController);


module.exports = router;