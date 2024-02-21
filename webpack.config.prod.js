const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "import-glob-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin(), new optimizeCssAssetsWebpackPlugin()]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: "style.[name].css"
    })
  ]
});
