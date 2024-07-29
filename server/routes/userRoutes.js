import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { body } from "express-validator";

const router = express.Router();

export const validateRegister = [
  body("first_name").notEmpty().withMessage("First name is required"),
  body("email").isEmail().withMessage("Enter a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;
