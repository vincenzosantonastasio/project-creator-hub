const http = require("http");
const creators = require("./creators");
const content = require("./content");
const users = require("./users");

const server = http.createServer((req, res) => {

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Creator Hub API running" }));

  } else if (req.url === "/creator" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(creators));

  } else if (req.url === "/content" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(content));

  } else if (req.url === "/feed" && req.method === "GET") {
    const sortedContent = [...content].sort((a, b) => b.id - a.id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(sortedContent));

  } else {
    res.writeHead(404);
    res.end();
  }

});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
