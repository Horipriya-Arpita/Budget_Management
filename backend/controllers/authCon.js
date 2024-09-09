import { connection } from "../db/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const userData = req.body;
    console.log('Received user data:', userData.username);  // Log the received data

    const q = "SELECT * FROM users WHERE username = ?";

    connection.query(q, [userData.username], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (data.length) {
            console.log("User exists");
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(userData.password, salt);

        const insertQuery = "INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)";

        const values = [
            userData.username,
            userData.email,
            hashedPassword,  // Assuming password is already hashed, otherwise hash it before storing
        ];

        connection.query(insertQuery, values, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error inserting user data' });
            }

            return res.status(200).json({ message: 'User created successfully', data: userData });

        });
        
    });
}


export const login = (req, res) => {
    const loginData = req.body;
    console.log('Received user data:', loginData.username);

    const q = "SELECT * FROM users WHERE username = ?";

    connection.query(q, [loginData.username], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        
        if (result.length === 0) {
        return res.status(401).json({ message: "User not found" });
        }

        const user = result[0];
        console.log(user);

        // Check if the password matches using bcrypt
        const passwordMatch = bcrypt.compareSync(loginData.password, user.password);

        if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
        }

        // If successful, return the user data (excluding password)

        const jwtSecret = "shhh";
        const token = jwt.sign(
            { id: user.id, username: user.username }, // Payload
            jwtSecret, // Secret key
            { expiresIn: "1h" } // Token expiration time
        );

        res.cookie("token", token, {
            httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === "production", // Set to true in production (requires HTTPS)
            maxAge: 60 * 60 * 1000,  // 1 hour in milliseconds
            sameSite: "strict" // Prevent CSRF attacks
        });

        // Send response back without exposing the token in the body
        res.json({
            message: "Login successful",
            user: { id: user.id, username: user.username, email: user.email }
        });

        
    });
}

