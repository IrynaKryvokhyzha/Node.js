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

  static registerForm(req, res) {
    const id = req.params.id;
    let item = null;
    if (id) {
      item = Product.getProductById(id);
    }
    res.render("products/productForm", { product: item });
  }
  static registerProduct(req, res) {
    const productData = { imgSrc: req.file.filename, ...req.body };
    if (req.params.id) {
      Product.updateProduct(req.params.id, productData);
    } else {
      Product.addNewProduct(productData);
    }
    res.redirect("/products");
  }
  static deleteProduct(req, res) {
    Product.deleteProductById(req.body.id);
  }
}
export default ProductsController;
