class ProductsApiManager {
  static async getProducts() {
    return RequestManager.fetchData("/products");
  }
  static async getProductById(id) {
    return RequestManager.fetchData(`/products/register/${id}`);
  }
  static async addProduct(data, id) {
    return RequestManager.doPostRequest(
      `/products/register/${id}`,
      data,
      "/list.html"
    );
  }
  static async deleteProduct(id) {
    return RequestManager.deleteRequest("/products/delete", id);
  }
}
