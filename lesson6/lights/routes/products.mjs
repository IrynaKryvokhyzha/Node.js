import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.render("products/productsList", { title: "Products" });
});
export default router;
