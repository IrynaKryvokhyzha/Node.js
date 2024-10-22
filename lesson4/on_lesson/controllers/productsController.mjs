import Product from "../models/Product.mjs";
class ProductsController {
  static mainProducts(req, res) {
    const productsList = Product.readProductsList();
    res.render("products/productsList", { products: productsList });
  }
  static productDetail(req, res) {
    const id = req.params.id;
    //oтримати обєкт продукта за id
    const product = Product.getProductById(id);
    //відрендерити сторінку з інфо про товар
    res.render("products/productDetail", { product }); //або  { product: product } - передається обєкт
  }
  static createForm(req, res) {
    //відрендерити сторінку з формою
    res.render("products/productForm", { product: {} }); //обєкт буде порожній, тому нічого не передаєм
  }
  static createProduct(req, res) {
    //дані з форми прилетять як обєкт в body
    const productData = req.body;
    Product.addNewProduct(productData);
    res.redirect("/products");
  }
  static getEditProductForm(req, res) {
    const product = Product.getProductById(req.params.id);
    res.render("products/productForm", { product });
  }
  static updateProduct(req, res) {
    Product.updateProduct(req.params.id, req.body);
    res.redirect("/products");
  }
  static deleteProduct(req, res) {
    Product.deleteProductById(req.params.id);
    res.send(200, "ok");
    res.redirect("/products");
  }
}
export default ProductsController;
