import express from "express";
const app = express();
const port = 3000;
// Маршрут для GET запиту до кореневого шляху
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
