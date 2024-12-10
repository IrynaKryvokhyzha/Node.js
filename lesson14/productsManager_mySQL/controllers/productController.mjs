import { validationResult } from "express-validator";
import ProductsDBService from "../models/product/ProductsDBService.mjs";

class ProductController {
  static async productsList(req, res) {
    try {
      const dataList = await ProductsDBService.getList({});
      res.render("productsList", {
        products: dataList,
        title: "Products List",
        user: req.session.user,
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
      res.render("register", {
        errors: [],
        data: product,
        user: req.session.user,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async registerProduct(req, res) {
    const errors = validationResult(req);
    const data = req.body;

    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("register", {
        errors: errors.array(),
        data,
      });
    }
    try {
      const { title, price, quantity } = req.body;
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
      res.status(500).render("register", {
        errors: [{ msg: error.message }],
        data,
      });
    }
  }
  static async deleteProduct(req, res) {
    try {
      await ProductsDBService.deleteById(req.body.id);
      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete product" });
    }
  }
}
export default ProductController;
