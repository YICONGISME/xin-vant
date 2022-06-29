module.exports = {
  presets: [
    ["@babel/preset-env", {
      "loose": true,
      "modules": false,
      "useBuiltIns": "usage",
      "corejs": "3",
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    ['@vue/babel-preset-jsx']
  ],
  plugins: ["@babel/plugin-transform-runtime"]
}
