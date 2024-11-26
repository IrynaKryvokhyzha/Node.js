import { Router } from "express";
const router = Router();
router.get("/login", (req, res) => {
  res.send("respond with a resource");
});
export default router;
