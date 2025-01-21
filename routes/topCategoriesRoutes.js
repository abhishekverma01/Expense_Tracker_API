const express = require('express');

// Import The Controller function
const { topCategoriesController } = require('../controllers/topCategoriesController')

const router = express.Router();
router.get('/', topCategoriesController);


module.exports = router;