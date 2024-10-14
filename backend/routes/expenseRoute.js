import express from "express";
import { addExpense, getExpenses, getCategories, addCategory } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/addexpense", addExpense); // Add an expense
router.get("/", getExpenses);
router.get("/categories", getCategories); // Get categories for a user
router.post("/categories", addCategory); // Add a new category

export default router;
