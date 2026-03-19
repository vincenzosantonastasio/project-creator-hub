const http = require("http");
const creators = require("./creators");
const content = require("./content");

// 🔥 NUOVO: utenti (semplice simulazione)
const users = [
  {
    id: 1,
    followed_creators: [1, 3] // segue MrBeast e Logan Paul
  }
];

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

  // 🔥 FEED GLOBALE
  } else if (req.url === "/feed") {
    res.writeHead(200, { "Content-Type": "application/json" });

    const sortedContent = [...content].sort((a, b) => b.id - a.id);

    res.end(JSON.stringify(sortedContent));

  // 🔥 FEED PERSONALIZZATO
  } else if (req.url.startsWith("/feed/user/")) {
    const userId = parseInt(req.url.split("/")[3]);

    const user = users.find(u => u.id === userId);

    if (user) {
      const personalizedContent = content
        .filter(c => user.followed_creators.includes(c.creator_id))
        .sort((a, b) => b.id - a.id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(personalizedContent));
    } else {
      res.writeHead(404);
      res.end();
    }

  // 🔥 CONTENUTI PER CREATOR
  } else if (req.url.startsWith("/creator/") && req.url.endsWith("/content")) {
    const id = parseInt(req.url.split("/")[2]);

    const creatorContent = content.filter(c => c.creator_id === id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(creatorContent));

  // 🔥 CREATOR + CONTENT
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
