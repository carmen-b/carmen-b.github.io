const fs = require("fs");
const path = require("path");

const SOURCE_ROOT = path.join(__dirname, "..", "content", "portfolio");
const DEST_ROOT = path.join(__dirname, "..", "dist", "portfolio");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyImagesRecursive(sourceDir, destDir) {
  ensureDir(destDir);

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyImagesRecursive(sourcePath, destPath);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(extension)) {
      continue;
    }

    fs.copyFileSync(sourcePath, destPath);
  }
}

copyImagesRecursive(SOURCE_ROOT, DEST_ROOT);
