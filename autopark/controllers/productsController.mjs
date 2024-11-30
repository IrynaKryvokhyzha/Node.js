import Product from "../models/Product.mjs";

class ProductsController {
  static mainProducts(req, res) {
    const productsList = Product.loadProductsList();
    res.render("products/productsList", { products: productsList });
  }
  static productDetail(req, res) {
    const id = req.params.id;
    const product = Product.getProductById(id);
    res.render("products/productDetail", { product });
  }
  static createForm(req, res) {
    res.render("products/productForm", {});
  }
  static addProduct(req, res) {
    const productData = req.body;
    Product.addNewProduct(productData);
    res.redirect("/products");
  }
}
export default ProductsController;
