
// This file will be used to add scripts to package.json since we can't modify it directly
// The actual scripts will come from the build process via the lov-add-dependency command

module.exports = {
  scripts: {
    test: "node src/scripts/test.js",
    "test:watch": "node src/scripts/test.js --watch"
  }
};
