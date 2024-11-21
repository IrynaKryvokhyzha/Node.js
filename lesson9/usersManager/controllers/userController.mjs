import UsersDBService from "../models/user/UsersDBService.mjs";
import TypesDBService from "../models/type/TypesDBService.mjs";
import { validationResult } from "express-validator";
import FilesManager from "../utils/FilesManager.mjs";
import fs from "fs";

class UserController {
  static async usersList(req, res) {
    try {
      const filters = {};
      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key];
      }
      const dataList = await UsersDBService.getList(filters);
      res.render("usersList", {
        users: dataList,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async registerForm(req, res) {
    try {
      const id = req.params.id;
      let user = null;
      if (id) {
        //отримати об"єкт за id
        user = await UsersDBService.getById(id);
      }
      const types = await TypesDBService.getList();
      console.log("===>>> types");
      console.log(types);

      //відредерити сторінку з формою
      res.render("register", {
        errors: [],
        data: user,
        types,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async registerUser(req, res) {
    // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
    const errors = validationResult(req);
    const data = req.body;
    const types = await TypesDBService.getList();

    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("register", {
        errors: errors.array(),
        data,
        types,
      });
    }
    try {
      const { email, age, password, name, type } = req.body;
      const dataObj = { email, age, password, name, type };
      if (req.file?.filename) {
        if (req.params.id) {
          const user = await UsersDBService.getById(req.params.id);
          FilesManager.removeImg(user.img, req._dirname, "uploads");
        }
        dataObj.img = req.file.filename;
      }
      if (req.params.id) {
        // Оновлюємо дані про користувача в базі даних
        await UsersDBService.update(req.params.id, dataObj);
      } else {
        // Додаємо користувача в базу даних
        await UsersDBService.create(dataObj);
      }
      res.redirect("/users");
    } catch (err) {
      if (req.file?.path) fs.unlinkSync(req.file.path);
      res.status(500).render("register", {
        errors: [{ msg: err.message }],
        data,
        types,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await UsersDBService.getById(req.body.id);
      FilesManager.removeImg(user.img, req._dirname, "uploads");
      await UsersDBService.deleteById(req.body.id);
      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete user" });
    }
  }
}
export default UserController;
