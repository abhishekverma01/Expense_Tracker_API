const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const expenseRoutes = require('./routes/expenses');
const expenseCategoryRoutes = require('./routes/expenseCategoryRoutes');
const topCategoriesRoutes = require('./routes/topCategoriesRoutes');
const expenseMonthlyRoutes = require('./routes/expenseMonthlyRoutes');
const expenseSummaryRoutes = require('./routes/expenseSummaryRoutes');

// Expense-related routes
app.use('/api/expenses/category', expenseCategoryRoutes);
app.use('/api/expenses/summary', expenseSummaryRoutes);
app.use('/api/expenses/top-categories', topCategoriesRoutes);
app.use('/api/expenses/monthly', expenseMonthlyRoutes);

// Add, Update, Delete, Get
app.use('/api/expenses', expenseRoutes);

// Handle 404
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
