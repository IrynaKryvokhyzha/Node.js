/*Задача 3. Через параметри запиту передають операцію (add, subtract, mult) і числа (розділені дефісами), які треба опрацювати. Знайти результат і повернути користувачу. Наприклад при запиті:
http://localhost:3000/add/12-4-23-45   - треба знайти суму чисел 12,4,23,45*/

import { createServer } from "node:http";

const server = createServer((req, res) => {
  let numbers;
  let result;
  if (req.url.startsWith("/add/")) {
    numbers = req.url.slice(5).split("-");
    result = numbers
      .map((el) => parseInt(el))
      .reduce((prevNum, curNum) => prevNum + curNum, 0);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Result: ${result}`);
    return;
  } else if (req.url.startsWith("/subtract/")) {
    numbers = req.url.slice(10).split("-");
    result = numbers
      .map((el) => parseInt(el))
      .reduce((prevNum, curNum) => prevNum - curNum);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Result: ${result}`);
    return;
  } else if (req.url.startsWith("/mult/")) {
    numbers = req.url.slice(6).split("-");
    result = numbers
      .map((el) => parseInt(el))
      .reduce((prevNum, curNum) => prevNum * curNum, 1);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Result: ${result}`);
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello\n");
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
