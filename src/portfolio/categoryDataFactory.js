const fs = require("fs");
const path = require("path");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

function getItemImages(inputPath, fileSlug) {
  const directoryPath = path.dirname(inputPath);

  return fs
    .readdirSync(directoryPath)
    .filter((fileName) => {
      const extension = path.extname(fileName).toLowerCase();
      const isImage = IMAGE_EXTENSIONS.has(extension);
      const isThumb = fileName.toLowerCase().includes("thumb");
      return isImage && !isThumb && fileName.startsWith(`${fileSlug}-`);
    })
    .sort();
}

module.exports = function createCategoryData({ slug, label, heading, description, order }) {
  return {
    layout: "portfolio-item.njk",
    category: slug,
    categoryLabel: label,
    categoryHeading: heading,
    categoryDescription: description,
    categoryOrder: order,
    eleventyComputed: {
      slug: (data) => data.page.fileSlug,
      permalink: (data) => `/portfolio/${slug}/${data.page.fileSlug}.html`,
      tags: () => ["portfolioItems", `portfolio-${slug}`],
      images: (data) => getItemImages(data.page.inputPath, data.page.fileSlug),
    },
  };
};
