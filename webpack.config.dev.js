const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, "src"),
    watchContentBase: true,
    port: 3000,
    hot: true
  },
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader", "import-glob-loader"]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
