// import ProductsController from "../controllers/productsController.mjs";
// import { Router } from "express";
// const router = Router();
// import multer from "multer";

// // Налаштовуємо місце збереження файлів та їх імена
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// router.get("/", ProductsController.mainProducts);

// router.get("/register/:id?", ProductsController.registerForm);
// router.post(
//   "/register/:id?",
//   upload.single("prodImg"),
//   ProductsController.registerProduct
// );

// router.get("/:id", ProductsController.productDetail);
// router.delete("/", ProductsController.deleteProduct);

// export default router;
