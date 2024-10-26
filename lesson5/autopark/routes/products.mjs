import ProductsController from "../controllers/productsController.mjs";
import { Router } from "express";
const router = Router();

router.get("/", ProductsController.mainProducts);

router.get("/register/:id?", ProductsController.registerForm);
router.post("/register/:id?", ProductsController.registerProduct);

router.get("/:id", ProductsController.productDetail);
router.delete("/", ProductsController.deleteProduct);

export default router;
