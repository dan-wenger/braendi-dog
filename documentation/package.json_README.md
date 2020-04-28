## Dependencies

#### express

used for server logic

#### sirv-cli

included by default in svelte projects. used to serve all static files in the public folder (which are the built versions from the svelte files in the src folder)

## Dev-Dependencies

#### nodemon

used to run a development server with live reload.
Without nodemon, you'd have to restart the server every time a change is made

#### svelte and everything "rollup"

**Svelte** is the "framework" I'm using here. The difference to React, Vue, Angular etc. is that it compiles everything to regular Javascript (web components). Advantage: bundles are very small and fast.
**Rollup** is the bundler used by svelte (similar to Webpack or Parcel)

## scripts

#### "build": "rollup -c"

trigger the build step from rollup. the -c flag (--config) uses the rollup.config.js for build settings

#### "dev": "rollup -c -w"

use this when working on your project. the -w flag (--watch) by rollup ensures that the app gets rebuilt when changes are made

#### "start": "sirv public"

serves static files from public folder using sirv-cli.

## Others

- [ ] Jest for testing
- [ ] Prettier for automatic code formatting
