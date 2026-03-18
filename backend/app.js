const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Creator Hub API running" }));
  } else if (req.url === "/creator") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        id: 1,
        name: "Sample Creator",
        platforms: ["YouTube", "TikTok"]
      })
    );
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
