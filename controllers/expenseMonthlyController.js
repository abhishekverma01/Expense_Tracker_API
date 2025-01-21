const db = require('../config/db');

/**
 * Controller to fetch monthly expense summaries
 * @route GET /api/expenses/monthly
 * @returns {JSON} - Array of monthly expense summaries with start date, end date, and total expenses
 */
exports.expenseMonthlyController = async (req, res) => {
    const query = `
        SELECT 
            DATE_FORMAT(MIN(date), '%Y-%m-%d') AS start_date, 
            DATE_FORMAT(MAX(date), '%Y-%m-%d') AS end_date, 
            SUM(amount) AS total_expenses
        FROM 
            expenses
        GROUP BY 
            MONTH(date)
    `;

    try {
        // Execute the query and fetch results
        const [results] = await db.execute(query);

        // Send the response with the fetched data
        res.status(200).json(results);
    } catch (err) {
        // Log the error for debugging
        console.error('Error fetching monthly expenses:', err);

        // Respond with a 500 status code and error message
        res.status(500).json({ error: err.message });
    }
};
