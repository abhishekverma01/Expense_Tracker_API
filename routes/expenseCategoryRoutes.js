const express = require('express');
const router = express.Router();

// Import the controller function
const { expenseCategoryController } = require('../controllers/expenseCategoryController');

router.get('/:category_id', expenseCategoryController);


module.exports = router;

