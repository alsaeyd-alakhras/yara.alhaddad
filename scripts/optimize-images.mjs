import { readdir, rename, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "assets", "images");
const ORIGINALS_DIR = path.join(IMAGES_DIR, "_originals");

const RASTER_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff"]);
const SKIP_DIRS = new Set(["_originals", "icons"]);

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function getOptions(relativePath) {
  if (relativePath.startsWith("profile/")) {
    return { quality: 82, effort: 6, maxWidth: 836 };
  }

  if (relativePath.startsWith("projects/")) {
    const isCover = /\/cover\.[^/]+$/.test(relativePath);
    return {
      quality: isCover ? 88 : 85,
      effort: isCover ? 6 : 4,
      maxWidth: isCover ? 2400 : 1920,
    };
  }

  return { quality: 85, effort: 4, maxWidth: null };
}

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(fullPath, files);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!RASTER_EXT.has(ext)) continue;

    files.push(fullPath);
  }

  return files;
}

async function archiveOriginal(sourcePath, relativePath) {
  const archivePath = path.join(ORIGINALS_DIR, relativePath);
  await mkdir(path.dirname(archivePath), { recursive: true });
  await rename(sourcePath, archivePath);
}

async function optimizeImage(sourcePath) {
  const relativePath = path.relative(IMAGES_DIR, sourcePath).replace(/\\/g, "/");
  const { quality, effort, maxWidth } = getOptions(relativePath);
  const outputPath = sourcePath.replace(/\.[^.]+$/, ".webp");

  const inputStats = await stat(sourcePath);
  let pipeline = sharp(sourcePath);

  if (maxWidth) {
    pipeline = pipeline.resize({
      width: maxWidth,
      withoutEnlargement: true,
    });
  }

  await pipeline
    .webp({ quality, effort })
    .toFile(outputPath);

  await archiveOriginal(sourcePath, relativePath);

  const outputStats = await stat(outputPath);
  const saved = inputStats.size - outputStats.size;
  const ratio = ((saved / inputStats.size) * 100).toFixed(1);

  return {
    file: relativePath,
    before: inputStats.size,
    after: outputStats.size,
    saved,
    ratio,
  };
}

async function main() {
  const files = await walk(IMAGES_DIR);

  if (files.length === 0) {
    console.log("No raster images found to optimize.");
    return;
  }

  console.log(`Optimizing ${files.length} image(s)...\n`);

  const results = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    results.push(result);
    totalBefore += result.before;
    totalAfter += result.after;
  }

  const nameWidth = Math.max(...results.map((r) => r.file.length), 4);

  for (const result of results) {
    console.log(
      `${result.file.padEnd(nameWidth)}  ${formatKB(result.before).padStart(10)} -> ${formatKB(result.after).padStart(10)}  (-${result.ratio}%)`
    );
  }

  const totalSaved = totalBefore - totalAfter;
  const totalRatio = ((totalSaved / totalBefore) * 100).toFixed(1);

  console.log("\n" + "-".repeat(nameWidth + 40));
  console.log(
    `${"TOTAL".padEnd(nameWidth)}  ${formatKB(totalBefore).padStart(10)} -> ${formatKB(totalAfter).padStart(10)}  (-${totalRatio}%)`
  );
  console.log(`\nOriginals archived to assets/images/_originals/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
