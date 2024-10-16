import { Router } from "express";
const router = Router();

router.get("/:myLinks", function (req, res) {
  const myLinks = req.params.myLinks;

  if (myLinks === "sites") {
    res.render("sites");
  } else if (myLinks === "films") {
    res.render("films");
  } else if (myLinks === "me") {
    res.render("me");
  } else {
    res.status(404).send("<h1>404: Сторінка не знайдена</h1>");
  }
});
export default router;
