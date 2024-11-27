import express from "express";
import LoginController from "../controllers/loginController.mjs";
import ProductValidator from "../validators/productValidator.mjs";
import { checkSchema } from "express-validator";

const router = express.Router();

router.get("/", LoginController.loginForm);
router.post("/", LoginController.authUser);

export default router;
