module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: [],
  env: {
    test: {
      plugins: [
        [
          "@babel/plugin-transform-modules-commonjs",
          {
            noInterop: true,
          },
        ],
      ],
    },
  },
};
