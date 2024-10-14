import { connection } from "../db/connect.js";
import jwt from 'jsonwebtoken';
// Add a new expense
export const addExpense = (req, res) => {
    // Extract token from cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    // Verify token and get user ID
    jwt.verify(token, "shhh", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const user_id = userInfo.id; // Extract user ID from token
        const { category, amount, date, description } = req.body; // Category name is provided from the frontend

        // Query the Categories table to get the category_id
        const categoryQuery = "SELECT id FROM Categories WHERE name = ? AND user_id = ?";
        
        connection.query(categoryQuery, [category, user_id], (err, categoryResult) => {
            if (err || categoryResult.length === 0) {
                console.log(err || "Category not found");
                return res.status(400).json({ message: 'Category not found or server error' });
            }

            const category_id = categoryResult[0].id; // Extract the category ID from the query result

            // Insert the expense into the Expenses table
            const q = `
                INSERT INTO Expenses (user_id, category_id, amount, date, description)
                VALUES (?, ?, ?, ?, ?)
            `;

            const values = [user_id, category_id, amount, date, description];

            connection.query(q, values, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: 'Server error' });
                }

                res.status(201).json({ message: 'Expense added successfully', expenseId: result.insertId });
            });
        });
    });
};
// Get all categories
// export const getCategories = (req, res) => {
    
//     const q = "SELECT * FROM Categories WHERE user_id = ?";

//     connection.query(q, [req.params.user_id], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error fetching categories' });
//         }

//         res.json(result);
//     });
// };

export const getCategories = (req, res) => {
    console.log("gese");
    // Extract the token from cookies
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json("Not logged in!");
    }

    // Verify the token and get the user ID
    jwt.verify(token, "shhh", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }

        const user_id = userInfo.id; // Extract user ID from the token
        console.log("aise id" + user_id);

        // Query to get categories for the user
        const q = "SELECT * FROM Categories WHERE user_id = ?";

        connection.query(q, [user_id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching categories' });
            }

            res.json(result); // Send the categories back to the client
        });
    });
};

// Add a new category
// export const addCategory = (req, res) => {
//     const { user_id, name } = req.body;

//     const q = "INSERT INTO Categories (user_id, name) VALUES (?, ?)";

//     connection.query(q, [user_id, name], (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ message: 'Error adding category' });
//         }

//         res.status(201).json({ message: 'Category added successfully' });
//     });
// };

// import jwt from 'jsonwebtoken';
// import { connection } from '../db/connect.js';

// export const addCategory = (req, res) => {
//     const token = req.cookies.accessToken;
    
//     if (!token) return res.status(401).json("Not logged in!");

//     // Verify the JWT token
//     jwt.verify(token, "shhh", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!");

//         const { name } = req.body;
//         const user_id = userInfo.id; // Extract user ID from token payload

//         // Insert the new category into the database
//         const q = "INSERT INTO Categories (user_id, name) VALUES (?, ?)";

//         connection.query(q, [user_id, name], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ message: 'Error adding category' });
//             }

//             res.status(201).json({ message: 'Category added successfully' });
//         });
//     });
// };

// Add a category with token validation
export const addCategory = (req, res) => {
    const token = req.cookies.token; 
    console.log(token);// Get token from cookies
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "shhh", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const userId = userInfo.id;
        console.log(userId); // Extract user ID from token
        const { name } = req.body;
        console.log(name);

        const q = "INSERT INTO Categories (name, user_id) VALUES (?, ?)";

        connection.query(q, [name, userId], (err, result) => {
            if (err) {
                console.log('Error inserting category:', err);
                return res.status(500).json({ message: 'Error adding category' });
            }

            res.status(201).json({ message: 'Category added successfully' });
        });
    });
};

export const getExpenses = (req, res) => {
    // Extract token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json("Not logged in!");  // If token is not available
    }

    // Verify the JWT token
    jwt.verify(token, "shhh", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }

        const user_id = userInfo.id;  // Extract user ID from token

        const q = `
            SELECT e.id, e.date, e.amount, e.description, c.name as category
            FROM Expenses e
            JOIN Categories c ON e.category_id = c.id
            WHERE e.user_id = ?
        `;

        connection.query(q, [user_id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching expenses' });
            }

            res.json(result);  // Send the expenses back as the response
        });
    });
};