const db = require('../config/db');

/**
 * Controller to generate a summary of expenses for each category
 * @route GET /api/expenses/summary
 * @returns {JSON} - Array of categories with their respective total amounts, date range, and category names
 */
exports.expenseSummaryController = async (req, res) => {
    const query = `
        SELECT 
            c.name AS category, 
            DATE_FORMAT(MIN(e.date), '%Y-%m-%d') AS min_date, 
            DATE_FORMAT(MAX(e.date), '%Y-%m-%d') AS max_date, 
            SUM(e.amount) AS total_amount 
        FROM 
            expenses AS e 
        JOIN 
            categories AS c 
        ON 
            e.category_id = c.id 
        GROUP BY 
            c.name 
        ORDER BY 
            total_amount DESC
    `;

    try {
        // Execute the query and fetch the summary data
        const [rows] = await db.execute(query);

        // Send the response with the fetched data
        res.status(200).json(rows);
    } catch (err) {
        // Log the error for debugging
        console.error('Error generating expense summary:', err);

        // Respond with a 500 status code and error message
        res.status(500).json({ error: err.message });
    }
};
