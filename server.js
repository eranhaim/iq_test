/**
 * Production server for the built React app (run `npm run build` first).
 * Serves files from dist/ and falls back to index.html so React Router
 * can handle /, /quiz, /he/, /he/quiz, etc.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = process.env.PORT || 8000;
const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

function send(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const type =
      MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
}

http
  .createServer((req, res) => {
    const { pathname } = new URL(req.url, `http://localhost:${PORT}`);
    const filePath = path.join(DIST, decodeURIComponent(pathname));

    if (!filePath.startsWith(DIST)) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      return res.end("Forbidden");
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return send(res, filePath);
    }
    // Anything that isn't a real file is a client-side route
    return send(res, path.join(DIST, "index.html"));
  })
  .listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}/`),
  );
