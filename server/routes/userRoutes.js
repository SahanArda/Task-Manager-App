import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updatePassword,
} from "../controllers/userController.js";
import { body } from "express-validator";
import auth from "../middleware/auth.js";

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

export const validateUpdatePassword = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.put('/:id/password', auth, validateUpdatePassword, updatePassword);

export default router;
