module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.svelte$": "svelte-jest",
  },
  moduleFileExtensions: ["js", "svelte"],
  collectCoverageFrom: [
    "**/*.{js,jsx,svelte}",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/z_*/**",
    "!**/coverage/**",
    "!**.config.js",
  ],
  coverageReporters: ["text", "html"],
};
