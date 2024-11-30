import TypesDBService from "../models/type/TypesDBService.mjs";
import { validationResult } from "express-validator";

class TypeController {
  static async getList(req, res) {
    try {
      const filters = {};
      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key];
      }
      const dataList = await TypesDBService.getList(filters);
      res.render("general/generalList", {
        pageTitle: "Types title",
        headerTitle: "Types list",
        fields: { title: "Назва" },
        data: dataList,
        addNewRoute: "/types/register",
        editLinkBase: "/types/register",
        deleteRoute: "/types",
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async registerForm(req, res) {
    try {
      const id = req.params.id;
      let typeItem = {};
      if (id) {
        //отримати об"єкт за id
        typeItem = await TypesDBService.getById(id);
      }
      //відредерити сторінку з формою
      res.render("general/generalEditForm", {
        pageTitle: "Type form",
        headerTitle: "Register form",
        fields: [
          { name: "title", type: "text", required: true, label: "Назва ролі" },
        ],
        initialValues: typeItem,
        errors: [],
        submitUrl: "/types/register" + (id ? `/${id}` : ""),
        redirectUrl: "/types",
        // data: user,
        // types,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async register(req, res) {
    // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
    const errors = validationResult(req);
    const data = req.body;

    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("general/generalEditForm", {
        pageTitle: "Type form",
        headerTitle: "Register form",
        fields: [
          { name: "title", type: "text", required: true, label: "Назва ролі" },
        ],
        initialValues: data,
        errors: errors.array(),
        submitUrl: "/types/register",
        redirectUrl: "/types",
      });
    }
    try {
      const { title } = req.body;
      const dataObj = { title };
      if (req.params.id) {
        // Оновлюємо дані про користувача в базі даних
        await TypesDBService.update(req.params.id, dataObj);
      } else {
        // Додаємо користувача в базу даних
        await TypesDBService.create(dataObj);
      }
      res.redirect("/types");
    } catch (error) {
      if (req.params.id) {
        // Оновлюємо дані про користувача в базі даних
        await TypesDBService.update(req.params.id, dataObj);
      } else {
        // Додаємо користувача в базу даних
        await TypesDBService.create(dataObj);
      }
      res.redirect("/types");
    }
  }

  static async delete(req, res) {
    try {
      await TypesDBService.deleteById(req.body.id);
      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete type" });
    }
  }
}
export default TypeController;
