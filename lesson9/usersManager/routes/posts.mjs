import express from "express";
import PostsController from "../controllers/postsController.mjs";

const router = express.Router();

router.get("/", PostsController.getList);
router.get("/register/:id?", PostsController.registerForm);
router.post("/register/:id?", PostsController.register);
router.delete("/delete", PostsController.delete);

router.post("/comments/:postId", PostsController.createComment);
router.delete("/comments/:postId", PostsController.deleteComment);

export default router;
