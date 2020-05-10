const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess({
    scss: {
      renderSync: true,
    },
  }),
  compiler: {
    css: false,
  },
};
