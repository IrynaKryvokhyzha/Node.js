import config from "../config/default.mjs";
// Імпортуємо необхідний модуль
import mongoose from "mongoose";
import mysql from "mysql2/promise";

// Встановлюємо глобальні проміси
mongoose.Promise = global.Promise;

// Функція для підключення до MySQL
async function connectToMySQL() {
  try {
    const pool = mysql.createPool({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });
    console.log("Успішно підключено до MySQL");
    return pool;
  } catch (err) {
    console.error("Помилка підключення до MySQL:", err);
  }
}

const pool = await connectToMySQL();
export default pool;
