class ProductsApiManager {
  static async getProducts() {
    return RequestManager.fetchData("/products");
    //  const response = await fetch("http://localhost:3000/api/v1/products");
    //  const data = await response.json();
    //  console.log("API Response:", data); // Log the response to check what's returned
    //  return data;
  }
  static async getProductById(id) {
    return RequestManager.fetchData(`/products/register/${id}`);
  }
  static async addProduct(data, id) {
    return RequestManager.doPostRequest(
      `/products/register/${id}`,
      data,
      "./list.html"
    );
  }
  static async deleteProduct(id) {
    return RequestManager.deleteRequest("/products", id);
  }
}
