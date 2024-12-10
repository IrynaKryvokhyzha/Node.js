import pool from "../../../db/connectDB.mjs";

class ProductsDBService {
  static async getList() {
    try {
      const [rows] = await pool.query("SELECT * FROM products");
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  static async create(data) {
    try {
      const sql = "INSERT INTO products SET ?";
      const [result] = await pool.query(sql, data);
      return { id: result.insertId, ...data };
    } catch (error) {
      console.error("Error saving data:", error);
      return null;
    }
  }

  static async getById(id) {
    try {
      const sql = "SELECT * FROM products WHERE id = ?";
      const [rows] = await pool.query(sql, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error fetching data by ID:", error);
      return null;
    }
  }

  static async update(id, data) {
    try {
      const sql = "UPDATE products SET ? WHERE id = ?";
      const [result] = await pool.query(sql, [data, id]);
      if (result.affectedRows === 0) {
        return null;
      }
      return { id, ...data };
    } catch (error) {
      console.error("Error updating data:", error);
      return null;
    }
  }

  static async deleteById(id) {
    try {
      const sql = "DELETE FROM products WHERE id = ?";
      const [result] = await pool.query(sql, [id]);
      if (result.affectedRows === 0) {
        return null;
      }
      return { id };
    } catch (error) {
      console.error("Error deleting data:", error);
      return null;
    }
  }
}

export default ProductsDBService;
