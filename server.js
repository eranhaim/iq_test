/**
 * Static file server with language-prefix URL rewriting.
 *
 * Routes like /he/quiz → serves quiz.html
 * Routes like /es/     → serves index.html
 * Static assets (css, js, images) served directly.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8000;
const ROOT = __dirname;
const LANGS = ["en", "he", "es", "ru", "it"];

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

function serve(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": mime });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  // Strip trailing slash for matching (keep root "/" as-is)
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSeg = (segments[0] || "").toLowerCase();

  // Check if first segment is a language code
  if (LANGS.includes(firstSeg)) {
    const rest = segments.slice(1).join("/");

    if (!rest || rest === "index.html") {
      // /he/ or /he/index.html → serve index.html
      return serve(res, path.join(ROOT, "index.html"));
    }

    // /he/quiz or /he/quiz.html → serve quiz.html
    const page = rest.endsWith(".html") ? rest : `${rest}.html`;
    const filePath = path.join(ROOT, page);

    if (fs.existsSync(filePath)) {
      return serve(res, filePath);
    }

    // Maybe it's a static asset referenced from a lang path (e.g. /he/styles.css)
    const assetPath = path.join(ROOT, rest);
    if (fs.existsSync(assetPath)) {
      return serve(res, assetPath);
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Not found");
  }

  // No language prefix — serve static files normally
  if (pathname === "/" || pathname === "") {
    return serve(res, path.join(ROOT, "index.html"));
  }

  // Try exact file
  let filePath = path.join(ROOT, pathname);

  // Security: prevent path traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    return res.end("Forbidden");
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return serve(res, filePath);
  }

  // Try adding .html
  if (fs.existsSync(filePath + ".html")) {
    return serve(res, filePath + ".html");
  }

  // Try index.html in directory
  const indexPath = path.join(filePath, "index.html");
  if (fs.existsSync(indexPath)) {
    return serve(res, indexPath);
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Language routes: ${LANGS.map((l) => `/${l}/`).join(", ")}`);
});
