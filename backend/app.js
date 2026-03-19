const http = require("http");
const creators = require("./creators");
const content = require("./content");
const users = require("./users");

// ensure last_seen exists
users.forEach(user => {
  if (!user.last_seen) {
    user.last_seen = {};
  }
});

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

  // GLOBAL FEED
  } else if (req.url === "/feed" && req.method === "GET") {
    const sortedContent = [...content].sort((a, b) => b.id - a.id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(sortedContent));

  // PERSONALIZED FEED WITH CATCH-UP
  } else if (req.url.startsWith("/feed/user/") && req.method === "GET") {
    const userId = parseInt(req.url.split("/")[3]);

    const user = users.find(u => u.id === userId);

    if (user) {
      const personalizedContent = content
        .filter(c => user.followed_creators.includes(c.creator_id))
        .filter(c => {
          const lastSeen = user.last_seen[c.creator_id] || 0;
          return c.id > lastSeen;
        })
        .sort((a, b) => b.id - a.id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(personalizedContent));
    } else {
      res.writeHead(404);
      res.end();
    }

  // MARK CONTENT AS SEEN
  } else if (req.url === "/mark-seen" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { userId, creatorId, contentId } = JSON.parse(body);

      const user = users.find(u => u.id === userId);

      if (user) {
        user.last_seen[creatorId] = contentId;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true }));
    });

  // USER FOLLOWING
  } else if (req.url.startsWith("/user/") && req.url.endsWith("/following") && req.method === "GET") {
    const userId = parseInt(req.url.split("/")[2]);

    const user = users.find(u => u.id === userId);

    if (user) {
      const following = creators.filter(c =>
        user.followed_creators.includes(c.id)
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(following));
    } else {
      res.writeHead(404);
      res.end();
    }

  // FOLLOW
  } else if (req.url === "/follow" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { userId, creatorId } = JSON.parse(body);

      const user = users.find(u => u.id === userId);

      if (user && !user.followed_creators.includes(creatorId)) {
        user.followed_creators.push(creatorId);
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true }));
    });

  // UNFOLLOW
  } else if (req.url === "/unfollow" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { userId, creatorId } = JSON.parse(body);

      const user = users.find(u => u.id === userId);

      if (user) {
        user.followed_creators = user.followed_creators.filter(
          id => id !== creatorId
        );
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true }));
    });

  // CREATOR CONTENT
  } else if (req.url.startsWith("/creator/") && req.url.endsWith("/content") && req.method === "GET") {
    const id = parseInt(req.url.split("/")[2]);

    const creatorContent = content.filter(c => c.creator_id === id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(creatorContent));

  // CREATOR PAGE
  } else if (req.url.startsWith("/creator/") && req.method === "GET") {
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
