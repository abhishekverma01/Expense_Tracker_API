const db = require('../config/db');

// Function to check if a category exists in the database
const checkCategoryExist = async (category) => {
    // Query to find if the category exists
    const [categoryRows] = await db.execute(
        `SELECT id FROM categories WHERE name = ?`,
        [category]
    );

    if (categoryRows.length === 0) {
        // If category does not exist, insert it and return the new ID
        const [result] = await db.execute(
            'INSERT INTO categories (name) VALUES (?)',
            [category]
        );
        return result.insertId;
    } 
    // If category exists, return the existing ID
    return categoryRows[0].id;
}

// Controller to add a new expense
exports.addExpense = async (req, res) => {
    const { category, amount, description, date } = req.body;
    
    try {   
        // Check if category exists or create a new one
        let category_id = await checkCategoryExist(category);
        
        // Insert the expense into the database
        await db.execute(
            'INSERT INTO expenses (category_id, amount, description, date) VALUES (?, ?, ?, ?)',
            [category_id, amount, description, date]
        );
        
        // Respond with success
        res.status(201).json({ message: "Expense added successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to get all expenses
exports.getExpenses = async (req, res) => {
    const query = `
        SELECT 
            expenses.id, 
            categories.name AS category, 
            expenses.amount, 
            expenses.description, 
            DATE_FORMAT(expenses.date, '%Y-%m-%d') AS date 
        FROM 
            expenses 
        JOIN 
            categories ON expenses.category_id = categories.id 
        ORDER BY 
            expenses.date DESC
    `;

    try {
        const [rows] = await db.execute(query);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to update an existing expense
exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { category, amount, description, date } = req.body;

    try {
        // Wait for the category_id to resolve
        const category_id = await checkCategoryExist(category);

        // Update the expense in the database
        await db.execute(
            'UPDATE expenses SET category_id = ?, amount = ?, description = ?, date = ? WHERE id = ?',
            [category_id, amount, description, date, id]
        );

        // Respond with success
        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (err) {
        console.error('Error updating expense:', err.message);
        res.status(500).json({ error: 'Failed to update expense' });
    }
};

// Controller to delete an expense
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        // Execute the delete operation
        await db.execute('DELETE FROM expenses WHERE id = ?', [id]);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to get an expense by ID
exports.getExpensesById = async (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
            categories.name AS category, 
            expenses.amount, 
            DATE_FORMAT(expenses.date, '%Y-%m-%d') AS date, 
            expenses.description 
        FROM 
            expenses 
        INNER JOIN 
            categories ON expenses.category_id = categories.id 
        WHERE 
            expenses.id = ?
    `;

    try {
        const [result] = await db.execute(query, [id]);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
