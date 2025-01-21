const db = require('../config/db');

/**
 * Controller to get all expenses by category
 * @route GET /api/expenses/category/:category_id
 * @returns {JSON} - Array of expenses for a given category with date, amount, and description
 */
exports.expenseCategoryController = async (req, res) => {
    try {
        const { category_id } = req.params;
        const query = `
            SELECT 
                DATE_FORMAT(date, "%Y-%m-%d") AS date, 
                amount, 
                description
            FROM 
                expenses 
            WHERE 
                category_id = ?
        `;

        // Execute the query with the category_id
        const [rows] = await db.execute(query, [category_id]);

        // If no expenses found for the given category
        if (rows.length === 0) {
            res.json({ total_expenses: 0 });
        } else {
            res.status(200).json(rows);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching total expenses' });
    }
};
