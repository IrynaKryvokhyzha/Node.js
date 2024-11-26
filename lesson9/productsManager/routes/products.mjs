import express from "express";
import ProductController from "../controllers/productController.mjs";
import ProductValidator from "../validators/productValidator.mjs";
import { checkSchema } from "express-validator";

const router = express.Router();
router.get("/", ProductController.productsList);
router.get("/register/:id?", ProductController.registerForm);
router.post(
  "/register/:id?",
  checkSchema(ProductValidator.productSchema),
  ProductController.registerProduct
);

export default router;
