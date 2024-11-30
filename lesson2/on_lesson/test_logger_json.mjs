import { createServer } from "node:http";
import fs from "fs";

const settings = JSON.parse(fs.readFileSync("settings.json"));
const historyRoute = settings.historyRoute;
const historyFilePath = settings.historyFilePath;

const server = createServer((req, res) => {
  const historyFilePath = "history.txt";

  if (req.url === historyRoute) {
    if (fs.existsSync(historyFilePath)) {
      fs.readFile(historyFilePath, (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Sorry file corrupted!\n");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("History is empty\n");
    }
  } else {
    fs.appendFile(historyFilePath, `${req.url}\n`, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error writing to history file\n");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("History updated\n");
    });
  }
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
