import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(".");
const port = Number(process.env.PORT || 8765);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jsx": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function sendFile(response, filePath) {
  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}

createServer((request, response) => {
  const requestedPath = decodeURIComponent(new URL(request.url, `http://localhost:${port}`).pathname);
  const cleanPath = normalize(requestedPath)
    .replace(/^(\.\.[/\\])+/, "")
    .replace(/^[/\\]+/, "");
  const candidate = join(root, cleanPath || "index.html");
  const publicCandidate = join(root, "public", cleanPath);

  if (candidate.startsWith(root) && existsSync(candidate) && statSync(candidate).isFile()) {
    sendFile(response, candidate);
    return;
  }

  if (publicCandidate.startsWith(root) && existsSync(publicCandidate) && statSync(publicCandidate).isFile()) {
    sendFile(response, publicCandidate);
    return;
  }

  sendFile(response, join(root, "index.html"));
}).listen(port, "127.0.0.1", () => {
  console.log(`Portfolio running at http://127.0.0.1:${port}/`);
});
