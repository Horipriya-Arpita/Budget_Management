import express from "express";
import { register,login } from "../controllers/authCon.js";
//import { login } from "../controllers/authCon.js";

const router = express.Router();

//router.post('/',register);

router.post("/login", login)
router.post("/register", register)
// router.post("/logout", logout)

export default router