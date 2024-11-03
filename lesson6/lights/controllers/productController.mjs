import ProductsDBService from "../models/products/ProductsDBService.mjs";
import { validationResult } from "express-validator";

class ProductController {
  static async productsList(req, res) {
    try {
      const dataList = await ProductsDBService.getList();
      console.log("=========productsDataList");
      console.log(dataList);
      res.render("products/productsList", {
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
        user = await ProductsDBService.getById(productId);
      }
      res.render("products/productRegister", {
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
      const { title, brand, price, description } = req.body;
      console.log("====>>> req.body");
      console.log(req.body);
      // Check if we are updating an existing product
      if (req.params.id) {
        // Оновлюємо дані про користувача в базі даних
        await ProductsDBService.update(req.params.id, {
          title,
          brand,
          price,
          description,
        });
      } else {
        // Додаємо користувача в базу даних
        await ProductsDBService.create({ title, brand, price, description });
      }
      res.redirect("/products");
    } catch (error) {
      console.error("Error registering product:", error);
      res.status(500).render("products/productRegister", {
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
