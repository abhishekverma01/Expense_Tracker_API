const express = require('express');

// import The Controller functions
const { 
    addExpense, 
    getExpenses, 
    updateExpense, 
    deleteExpense, 
    getExpensesById 
} = require('../controllers/expenseController');

const router = express.Router();

router.post('/', addExpense);
router.get('/', getExpenses);
router.get('/:id', getExpensesById);
router.patch('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;