import ProductsController from "../controllers/productsController.mjs";
import { Router } from "express";
import multer from "multer";
const router = Router();

// Налаштовуємо місце збереження файлів та їх імена
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", ProductsController.mainProducts);
router.get("/create", ProductsController.createForm);
router.get("/:id", ProductsController.productDetail); //id завжди передається як string!
router.post("/", upload.single("prodImg"), ProductsController.createProduct); //отримуємо дані
router.get("/edit/:id?", ProductsController.getEditProductForm);
router.post("/edit/:id?", ProductsController.updateProduct);
router.delete("/", ProductsController.deleteProduct);
export default router;
