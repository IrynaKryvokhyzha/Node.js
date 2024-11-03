import express from "express";
import ProductController from "../controllers/productController.mjs";
import ProductValidator from "../validators/productValidator.mjs";
import { checkSchema } from "express-validator";

const router = express.Router();
router.get("/", ProductController.productsList);
router.get("/productRegister/:id?", ProductController.registerForm);
router.post(
  "/productRegister/:id?",
  checkSchema(ProductValidator.productSchema),
  ProductController.registerProduct
);
export default router;
