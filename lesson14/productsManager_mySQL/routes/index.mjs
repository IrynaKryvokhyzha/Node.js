import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.render("index", { title: "Homework 14", user: req.session.user });
});
export default router;
