import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.render("goals", { title: "My Goals" });
});
export default router;
