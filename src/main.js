import App from "./App.svelte";

// Entry point for the build step is this main.js file. It imports the main Svelte file (App.svelte) and injects it into the body tag of index.html
var app = new App({
  target: document.body,
});

export default app;
