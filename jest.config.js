module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.svelte$": "svelte-jest",
  },
  moduleFileExtensions: ["js", "svelte"],
  collectCoverageFrom: [
    "**/*.{js,jsx,svelte}",
    "!**/*.config.js",
    "!**/App.svelte",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"],
  coverageReporters: ["text", "html"],
  verbose: true,
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
