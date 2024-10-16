import { Router } from "express";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
const router = Router();
router.get("/", (req, res) => {
  //send .ejs
  //res.render("coffee", { title: "Coffee" });

  //send .html
  res.sendFile(path.join(__dirname, "../views", "coffee.html"));
});
export default router;
