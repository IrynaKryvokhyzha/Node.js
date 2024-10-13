/*Задача 4. Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”) повертає створені HTML документи (розмістіть їх там же, де і додаток), що описують: інформацію про себе, інфорімацію про улюблену кав’ярню,  інформацію про улюблений музичний гурт.
 */

import { createServer } from "node:http";
import fs from "fs";

const server = createServer((req, res) => {
  const filePath = req.url === "/" ? "index.html" : req.url.slice(1);
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server error!");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File not found!\n");
  }
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
