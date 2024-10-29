import User from "../models/User.mjs";
import { validationResult } from "express-validator";

class UserController {
  static usersList(req, res) {
    const dataList = User.loadUserList();

    res.render("users/usersList", {
      users: dataList,
    });
  }
  static registerForm(req, res) {
    const id = req.params.id;
    let user = null;
    if (id) {
      //отримати об"єкт за id
      user = User.getUserById(id);
    }
    //відредерити сторінку з формою
    res.render("users/register", {
      errors: [],
      data: user,
    });
  }
  static registerUser(req, res) {
    // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
    const errors = validationResult(req);
    console.log("=====>>> errors");
    console.log(errors);

    if (!errors.isEmpty()) {
      const data = req.body;
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("users/register", {
        errors: errors.array(),
        data,
      });
    }

    const { email, password, name } = req.body;
    if (req.params.id) {
      // Оновлюємо дані про користувача в базі даних
      User.updateUser(req.params.id, { email, password, name });
    } else {
      // Додаємо користувача в базу даних
      User.create({ email, password, name });
    }

    res.redirect("/users");
  }

  static async deleteUser(req, res) {
    try {
      await User.deleteUserById(req.body.id);
      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete user" });
    }
  }
}

export default UserController;
