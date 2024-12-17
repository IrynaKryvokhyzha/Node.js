import express from "express";
import ProductController from "../controllers/productController.mjs";
// import { getPermissionsChecker } from "../../../middleware/auth.mjs";
import upload from "../../../middleware/UploadManager.mjs";

const router = express.Router();
// const permissionsChecker = getPermissionsChecker("products");

router.get(
  "/",
  //  permissionsChecker("read"),
  ProductController.getAllProducts
);
router.get(
  "/register/:id?",
  //   permissionsChecker("read"),
  ProductController.registerForm
);
router.post(
  "/register/:id?",
  //   permissionsChecker("create"),
  upload.single("image"),
  ProductController.registerProduct
);
// router.put(
//   "/register/:id?",
//   permissionsChecker("update"),
//   upload.single("image"),
//   ProductController.registerProduct
// );
router.delete(
  "/",
  //   permissionsChecker("delete"),
  ProductController.deleteProduct
);

export default router;
