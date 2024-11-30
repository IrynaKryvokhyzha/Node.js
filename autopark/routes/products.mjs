import ProductsController from "../controllers/productsController.mjs";
import { Router } from "express";
const router = Router();

router.get("/", ProductsController.mainProducts);
router.get("/create", ProductsController.createForm);
router.get("/:id", ProductsController.productDetail);
router.post("/", ProductsController.addProduct);
router.get("/edit/:id", ProductsController.getEditProductForm);

export default router;
