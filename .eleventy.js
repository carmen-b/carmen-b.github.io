module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("portfolioItems", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/portfolio/*/*.md")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0)),
  );
  eleventyConfig.addCollection("portfolioCategories", (collectionApi) => {
    const items = collectionApi.getFilteredByTag("portfolioItems");
    const categoryMap = new Map();

    for (const item of items) {
      const { category, categoryLabel, categoryHeading, categoryDescription, categoryOrder } = item.data;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          slug: category,
          label: categoryLabel,
          heading: categoryHeading,
          description: categoryDescription,
          order: categoryOrder,
          tag: `portfolio-${category}`,
        });
      }
    }

    return Array.from(categoryMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  });

  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/files": "files" });
  eleventyConfig.addPassthroughCopy({ "src/libs": "libs" });
  eleventyConfig.addPassthroughCopy({ "src/styles": "styles" });
  eleventyConfig.addPassthroughCopy({ "src/scripts": "scripts" });
  eleventyConfig.addPassthroughCopy("src/portfolio/**/*.jpg");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md"],
  };
};
