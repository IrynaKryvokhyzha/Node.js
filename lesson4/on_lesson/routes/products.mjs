import ProductsController from "../controllers/productsController.mjs";
import { Router } from "express";
const router = Router();
router.get("/", ProductsController.mainProducts);
router.get("/create", ProductsController.createForm);
router.get("/:id", ProductsController.productDetail); //id завжди передається як string!
router.post("/", ProductsController.createProduct); //отримуємо дані
router.get("/edit/:id", ProductsController.getEditProductForm);
router.post("/edit/:id", ProductsController.updateProduct);
router.delete("/", ProductsController.deleteProduct);
export default router;
