// import dataFileManager from "../utils/DataFileManager.mjs";

// class Product {
//   static loadProductsList() {
//     try {
//       return dataFileManager.loadData();
//     } catch (error) {
//       throw new Error("Failed to load products!");
//     }
//   }
//   static addNewProduct(productObj) {
//     try {
//       dataFileManager.addItem({
//         id: new Date().getTime(),
//         ...productObj,
//       });
//     } catch (error) {
//       throw new Error("Failed to add product!");
//     }
//   }
//   static getProductById(id) {
//     try {
//       return dataFileManager.getItemById(id);
//     } catch (error) {
//       throw new Error("Failed to get product by id!");
//     }
//   }
//   static updateProduct(id, productData) {
//     try {
//       dataFileManager.updateItemById(id, productData);
//     } catch (error) {
//       throw new Error("Failed to update product!");
//     }
//   }
//   static deleteProductById(id) {
//     try {
//       dataFileManager.deleteItemById(id);
//     } catch (error) {
//       throw new Error("Failed to delete product!");
//     }
//   }
// }
// export default Product;
