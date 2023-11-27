import fs from "fs";
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text-html" });
    res.end(htmlFile);
    return;
  }

  if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "application/javascript" });
  }

  if (req.url?.endsWith(".css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
  }

  const response = fs.readFileSync(`./public${req.url}`, "utf-8");
  res.end(response);
});

server.listen(3000, () => {
  console.log("Server running in server 3000");
});
