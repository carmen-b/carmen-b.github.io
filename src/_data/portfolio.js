const fs = require("fs");
const path = require("path");

const PORTFOLIO_ROOT = path.join(__dirname, "..", "..", "content", "portfolio");
const CATEGORY_LABELS = {
  branding: "Branding",
  print: "Print",
  stationery: "Stationery",
  illustration: "Illustration",
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function readTextIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  return fs.readFileSync(filePath, "utf-8").trim();
}

function getItemImages(categorySlug, itemSlug) {
  const categoryPath = path.join(PORTFOLIO_ROOT, categorySlug);
  const files = fs.readdirSync(categoryPath);

  return files
    .filter((file) => {
      const lower = file.toLowerCase();
      const isImage = lower.endsWith(".jpg") || lower.endsWith(".png");
      const isThumb = lower.includes("thumb");
      return isImage && !isThumb && file.startsWith(`${itemSlug}-`);
    })
    .sort();
}

module.exports = () => {
  const portfolioData = readJson(path.join(PORTFOLIO_ROOT, "_data.json"));
  const categoryOrder = portfolioData.index.categories;

  const categories = categoryOrder.map((categorySlug) => {
    const categoryData = readJson(path.join(PORTFOLIO_ROOT, categorySlug, "_data.json"));
    const categoryMarkdown = readTextIfExists(path.join(PORTFOLIO_ROOT, categorySlug, "index.md"));

    const items = Object.entries(categoryData)
      .filter(([itemSlug]) => itemSlug !== "index")
      .map(([itemSlug, itemMeta]) => ({
        slug: itemSlug,
        category: categorySlug,
        title: itemMeta.title,
        markdown: readTextIfExists(path.join(PORTFOLIO_ROOT, categorySlug, `${itemSlug}.md`)),
        images: getItemImages(categorySlug, itemSlug),
      }));

    return {
      slug: categorySlug,
      label: CATEGORY_LABELS[categorySlug] || categorySlug,
      markdown: categoryMarkdown,
      items,
    };
  });

  const items = categories.flatMap((category) => category.items);

  return {
    categories,
    items,
  };
};
