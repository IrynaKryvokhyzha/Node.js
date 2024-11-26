import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.render("index", { title: "Homework 9" });
});
export default router;
