import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.render("products", { title: "Products" });
});
router.get("/add", (req, res) => {
  try {
    res.render("productsAdd", { title: "Add products" });
  } catch (error) {
    console.error("Error rendering view:", error);
    res.status(500).send("Unable to load the view");
  }
});
export default router;
