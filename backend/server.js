// import express from "express";
// const app = express();

// import cors from "cors";
// import path from "path";

// import checkDbConnection from "../db/connect";



// //app.use(express.static(path.join(__dirname, "public")));
// app.use(cors());
// app.use(express.json());

// app.listen(5000, () => {
//     checkDbConnection();
//     console.log("server is running on port 5000");
// });

import express from "express";
import cors from "cors";
import path from "path";
import authroutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
//import register from "./controllers/authCon.js";

import { checkDbConnection, createTables } from "./db/connect.js"; // Corrected import path

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow only your frontend origin
  credentials: true,               // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 

// Check database connection
checkDbConnection();

// Create necessary tables
createTables();

// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// app.post('/api/register', (req, res) => {
//   const userData = req.body;
//   console.log('Received user data:', userData);  // Log the received data
//   res.json({ message: 'User data received', data: userData });

// });

app.use('/api',authroutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
