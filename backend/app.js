const http = require("http");
const fs = require("fs");
const path = require("path");

const creators = require("./creators");
const content = require("./content");
const users = require("./users");

const server = http.createServer((req, res) => {

  // 👉 SERVE FRONTEND
  if (req.url === "/" && req.method === "GET") {
    const filePath = path.join(__dirname, "../frontend/index.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading page");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });

  } else if (req.url === "/creator" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(creators));

  } else if
