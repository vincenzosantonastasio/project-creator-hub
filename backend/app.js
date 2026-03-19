const http = require("http");
const creators = require("./creators");
const content = require("./content");

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Creator Hub API running" }));

  } else if (req.url === "/creator") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(creators));

  } else if (req.url === "/content") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(content));

  } else if (req.url.startsWith("/creator/")) {
    const id = parseInt(req.url.split("/")[2]);

    const creator = creators.find(c => c.id === id);

    if (creator) {
      const creatorContent = content.filter(c => c.creator_id === creator.id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        ...creator,
        content: creatorContent
      }));
    } else {
      res.writeHead(404);
      res.end();
    }

  } else {
    res.writeHead(404);
    res.end();
  }

});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
