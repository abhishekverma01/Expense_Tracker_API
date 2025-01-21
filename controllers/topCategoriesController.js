const db = require('../config/db'); 

/**
 * Controller to fetch the top 3 categories based on total spending
 * @route GET /api/expenses/top-categories
 * @returns {JSON} - Array of top 3 categories with min/max dates and total spent
 */
exports.topCategoriesController = async (req, res) => {
    const query = `
        SELECT 
            c.name AS categories,
            DATE_FORMAT(MIN(e.date), '%Y-%m-%d') AS min_date,
            DATE_FORMAT(MAX(e.date), '%Y-%m-%d') AS max_date,
            SUM(e.amount) AS total_spent 
        FROM 
            categories c 
        INNER JOIN 
            expenses e 
        ON 
            c.id = e.category_id 
        GROUP BY 
            c.name 
        ORDER BY 
            total_spent DESC 
        LIMIT 3
    `;

    try {
        // Execute the query and fetch results
        const [rows] = await db.execute(query);

        // Log the successful query execution
        console.log('Query executed successfully');

        // Send the response with the fetched data
        res.status(200).json(rows);
    } catch (err) {
        // Log the error for debugging
        console.error('Error executing query:', err);

        // Respond with a 500 status code and error message
        res.status(500).json({ error: 'Error fetching top categories' });
    }
};
