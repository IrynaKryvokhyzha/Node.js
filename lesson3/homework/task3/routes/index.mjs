import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.render("index", { title: "Welcome", user: "my Friend" });
});
export default router;
