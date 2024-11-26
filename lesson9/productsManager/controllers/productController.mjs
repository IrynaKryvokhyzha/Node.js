import ProductsDBService from "../models/ProductsDBService.mjs";
import { validationResult } from "express-validator";

class ProductController {
  static async productsList(req, res) {
    try {
      const filters = {};
      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key];
      }
      const dataList = await ProductsDBService.getList(filters);
      res.render("productsList", {
        products: dataList,
        title: "Products List",
      });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
  static async registerForm(req, res) {
    try {
      const productId = req.params.id;
      let product = null;
      if (productId) {
        product = await ProductsDBService.getById(productId);
      }
      res.render("products/register", {
        errors: [],
        data: product,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async registerProduct(req, res) {
    const errors = validationResult(req);
    const data = req.body;

    console.log("=========productsData");
    console.log(data);

    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("products/productRegister", {
        errors: errors.array(),
        data,
      });
    }
    try {
      const { title, price, quantity } = req.body;
      console.log("====>>> req.body");
      console.log(req.body);
      const productData = { title, price, quantity };

      // Check if we are updating an existing product
      if (req.params.id) {
        // Оновлюємо дані про користувача в базі даних
        await ProductsDBService.update(req.params.id, productData);
      } else {
        // Додаємо користувача в базу даних
        await ProductsDBService.create(productData);
      }
      res.redirect("/products");
    } catch (error) {
      console.error("Error registering product:", error);
      res.status(500).render("products/register", {
        errors: [{ msg: error.message }],
        data,
      });
    }
  }
}
export default ProductController;
