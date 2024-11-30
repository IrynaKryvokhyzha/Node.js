import express from "express";
import TypesController from "../controllers/typeController.mjs";

const router = express.Router();
router.get("/", TypesController.getList);
router.get("/register/:id?", TypesController.registerForm);
router.post("/register/:id?", TypesController.register);
router.delete("/", TypesController.delete);

export default router;
