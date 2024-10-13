/*Задача 2. Користувач через роут ‘/save_num/число’ може передати на сервер якесь число. Ці числа поступово треба зберігати у текстовому файлі numbers.txt. Наприклад, використовуючи такий роут:
http://localhost:3000/save_num/78  -  у файл треба додати число 78.
А використовуючи роути  ‘/sum’ – знайти суму, ‘mult’ –знайти добуток. За роутом «/remove» файл треба видалити.*/

import { createServer } from "node:http";
import fs from "fs";

const server = createServer((req, res) => {
  const filePath = "numbers.txt";
  let numbers;
  //  Save numbers in file numbers.txt
  if (req.url.startsWith("/save_num/")) {
    numbers = req.url.slice(10);
    console.log(numbers);
    fs.appendFile(filePath, `Number: ${numbers}\n`, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Sorry file corrupted!\n");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Number ${numbers} saved`);
    });
    //  Save sum in file numbers.txt
  } else if (req.url.startsWith("/sum/")) {
    numbers = req.url.slice(5).split("-");
    console.log(`numbers ${numbers}`);
    const sum = numbers
      .map((el) => parseInt(el))
      .reduce((prevSum, el) => prevSum + el, 0);
    console.log(`Sum ${sum}`);
    fs.appendFile(filePath, `Sum: ${sum}\n`, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Sorry file corrupted!\n");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Sum ${sum} saved`);
    });
    //  Save product in file
  } else if (req.url.startsWith("/mult/")) {
    numbers = req.url.slice(6).split("-");
    const product = numbers
      .map((el) => parseInt(el))
      .reduce((prevNum, el) => prevNum * el, 1);
    fs.appendFile(filePath, `Product: ${product}\n`, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Sorry file corrupted!\n");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Product ${product} saved!`);
    });
    //  remove file numbers.txt
  } else if (req.url.startsWith("/remove")) {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Sorry file corrupted!\n");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("File removed!\n");
    });
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("invalid url");
  }
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
