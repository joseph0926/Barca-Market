module.exports = {
  presets: [
    "next/babel",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    ["@babel/preset-flow"],
  ],
  plugins: [["styled-components", { ssr: true }]],
};
