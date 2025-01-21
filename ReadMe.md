<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Tracker API - README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f8f8f8;
        }
        container {
            width: 80%;
            margin: auto;
            overflow: hidden;
        }
        h1, h2 {
            color: #333;
        }
        p {
            color: #666;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 10px;
        }
        code {
            background-color: #f1f1f1;
            padding: 2px 4px;
            font-family: monospace;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Expense Tracker API</h1>

        <h2>Project Description</h2>
        <p><strong>Expense Tracker API</strong> is a backend service for managing personal or business expenses. It provides endpoints for adding, updating, deleting, and retrieving expenses along with associated categories. The API allows users to view expense summaries, categorize expenses, and generate reports.</p>

        <h2>Features</h2>
        <ul>
            <li><strong>Add Expense</strong>: Allows adding new expenses with category, amount, description, and date.</li>
            <li><strong>Update Expense</strong>: Provides functionality to update existing expenses.</li>
            <li><strong>Delete Expense</strong>: Enables deletion of expenses by ID.</li>
            <li><strong>Get Expenses</strong>: Fetches all expenses with sorting by date.</li>
            <li><strong>Get Expenses by Category</strong>: Retrieves expenses filtered by category.</li>
            <li><strong>Expense Summary</strong>: Generates summaries of expenses grouped by category.</li>
            <li><strong>Monthly Expenses</strong>: Summarizes monthly expenses with start/end dates and total amount.</li>
            <li><strong>Top Categories</strong>: Displays top categories based on total spending.</li>
        </ul>

        <h2>Database Schema and Sample Data</h2>
        <h3>Database Schema</h3>
        <p>**Tables**:</p>
        <ul>
            <li><strong>categories</strong>  
                <ul>
                    <li>id (Primary Key)</li>
                    <li>name</li>
                </ul>
            </li>
            <li><strong>expenses</strong>  
                <ul>
                    <li>id (Primary Key)</li>
                    <li>category_id (Foreign Key to categories.id)</li>
                    <li>amount</li>
                    <li>description</li>
                    <li>date</li>
                </ul>
            </li>
        </ul>
        <p>**SQL Script for Database Schema**:</p>
        <code>
            CREATE TABLE categories (<br>
                id INT AUTO_INCREMENT PRIMARY KEY,<br>
                name VARCHAR(255) NOT NULL UNIQUE<br>
            );<br>
            <br>
            CREATE TABLE expenses (<br>
                id INT AUTO_INCREMENT PRIMARY KEY,<br>
                category_id INT NOT NULL,<br>
                amount DECIMAL(10,2) NOT NULL,<br>
                description TEXT,<br>
                date DATE NOT NULL,<br>
                FOREIGN KEY (category_id) REFERENCES categories(id)<br>
            );<br>
        </code>

        <h2>Backend Code Structure</h2>
        <h3>Endpoints</h3>
        <ul>
            <li><strong>Add Expense</strong>: <code>POST /api/expenses</code></li>
            <li><strong>Update Expense</strong>: <code>PATCH /api/expenses/:id</code></li>
            <li><strong>Delete Expense</strong>: <code>DELETE /api/expenses/:id</code></li>
            <li><strong>Get All Expenses</strong>: <code>GET /api/expenses</code></li>
            <li><strong>Get Expenses by Category</strong>: <code>GET /api/expenses/category/:category_id</code></li>
            <li><strong>Expense Summary</strong>: <code>GET /api/expenses/summary</code></li>
            <li><strong>Monthly Expenses</strong>: <code>GET /api/expenses/monthly</code></li>
            <li><strong>Top Categories</strong>: <code>GET /api/expenses/top-categories</code></li>
        </ul>

        <h2>Setup Instructions</h2>
        <h3>Prerequisites</h3>
        <ul>
            <li>Node.js and npm installed</li>
            <li>MySQL database setup with <strong>mysql2</strong></li>
        </ul>

        <h3>Database Configuration</h3>
        <code>
            // config/db.js<br>
            const mysql = require('mysql2');<br>
            <br>
            const pool = mysql.createPool({<br>
              host: process.env.DB_HOST,<br>
              user: process.env.DB_USER,<br>
              password: process.env.DB_PASSWORD,<br>
              database: process.env.DB_NAME<br>
            });<br>
            <br>
            module.exports = pool.promise();
        </code>

        <h3>Steps to Run the Application</h3>
        <ol>
            <li>Clone the repository:<br>
                <code>git clone https://github.com/username/expense-tracker-api.git</code><br>
                <code>cd expense-tracker-api</code>
            </li>
            <li>Install dependencies:<br>
                <code>npm install</code>
            </li>
            <li>Configure environment variables:<br>
                Create a <code>.env</code> file in the root directory:<br>
                <code>PORT=3000</code><br>
                <code>DB_HOST=localhost</code><br>
                <code>DB_USER=root</code><br>
                <code>DB_PASSWORD=password</code><br>
                <code>DB_NAME=expense_tracker</code>
            </li>
            <li>Run the database migration:<br>
                <code>npm run migrate</code>
            </li>
            <li>Start the server:<br>
                <code>npm start</code>
            </li>
        </ol>

        <h2>API Testing with Postman</h2>
        <p>Import the included <strong>Postman Collection</strong> for testing the API endpoints.</p>

        <h2>Optional: Frontend Code</h2>
        <p>- <strong>Frontend Repository</strong>: <a href="#">Link to frontend repository</a></p>
        <p>- <strong>Deployed Project</strong>: <a href="#">Link to deployed project</a></p>
    </div>

</body>
</html>
