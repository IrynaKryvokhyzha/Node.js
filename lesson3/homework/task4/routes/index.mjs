import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.render("index", { title: "Our website" });
});
export default router;
