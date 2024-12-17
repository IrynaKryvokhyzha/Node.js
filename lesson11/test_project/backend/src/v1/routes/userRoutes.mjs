import express from "express";
import UserController from "../controllers/userController.mjs";
import UserValidator from "../../../validators/userValidator.mjs";
// import { getPermissionsChecker } from "../../../middleware/auth.mjs";
import { checkSchema } from "express-validator";

const router = express.Router();
// const permissionsChecker = getPermissionsChecker("users");
// router.get(
//   "/:id",
//   //  permissionsChecker('read'),
//   UserController.getById
// );
router.get(
  "/",
  //  permissionsChecker("read"),
  UserController.usersList
);
router.get(
  "/register/:id?",
  //   permissionsChecker("read"),
  UserController.registerForm
);
router.post(
  "/register/:id?",
  //   permissionsChecker("update"),
  checkSchema(UserValidator.userSchema),
  UserController.registerUser
);
router.delete(
  "/",
  //  permissionsChecker("delete"),
  UserController.deleteUser
);

export default router;
