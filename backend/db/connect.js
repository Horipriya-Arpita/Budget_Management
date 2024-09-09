import mysql from "mysql";
import { config } from "dotenv";

config();

// Create a single connection instance
export const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Function to check the database connection
export const checkDbConnection = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
        console.log('Connected to the database as id', connection.threadId);
    });
};

// Function to create necessary tables
export const createTables = () => {
    const usersTable = `
        CREATE TABLE IF NOT EXISTS Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            profile_picture VARCHAR(255)
        )
    `;

    const budgetsTable = `
        CREATE TABLE IF NOT EXISTS Budgets (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            total_budget DECIMAL(10, 2) NOT NULL,
            month INT NOT NULL,
            year INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
        )
    `;

    const categoriesTable = `
        CREATE TABLE IF NOT EXISTS Categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
        )
    `;

    const expensesTable = `
        CREATE TABLE IF NOT EXISTS Expenses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            category_id INT,
            amount DECIMAL(10, 2) NOT NULL,
            date DATE NOT NULL,
            description TEXT,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
            FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE SET NULL
        )
    `;

    connection.query(usersTable, (err, result) => {
        if (err) throw err;
        console.log('Users table created or already exists.');
    });

    connection.query(budgetsTable, (err, result) => {
        if (err) throw err;
        console.log('Budgets table created or already exists.');
    });

    connection.query(categoriesTable, (err, result) => {
        if (err) throw err;
        console.log('Categories table created or already exists.');
    });

    connection.query(expensesTable, (err, result) => {
        if (err) {
            console.error('Error creating Expenses table:', err);
            return;
        }
        console.log('Expenses table created or already exists.');
    });
};

export default connection;
