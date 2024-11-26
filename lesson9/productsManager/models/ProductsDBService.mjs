import Product from "./Products.mjs";

class ProductsDBService {
  static async getList() {
    try {
      const exists = await Product.checkCollectionExists();
      if (exists) {
        const data = await Product.find().exec();
        return data ?? [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  static async create(data) {
    try {
      const product = new Product(data);
      return await product.save();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }
  static async update(id, data) {
    try {
      return await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }
}
export default ProductsDBService;
