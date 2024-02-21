const path = require('path')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const s3Url = require('./config').Defaults.s3URL
const ENV = process.env.NODE_ENV || 'DEV'

module.exports = {
  entry: {
    home: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ENV === 'DEV' ? '' : s3Url,
  },
  module: {
    rules: [
      {
        test: /\.mp4$/,
        loader: 'file-loader',
        options: {
          outputPath: 'videos/',
          publicPath: './videos/', // relative path for webpack-dev-server
        },
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: ENV === 'PROD' ? `${s3Url}/images/` : './images/',
        },
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
    ],
  },
  plugins: [
    new cleanWebpackPlugin(),
    new htmlWebpackPlugin({
      isProd: ENV === 'PROD',
      title: 'Document',
      filename: 'index.html',
      template: './src/index.pug',
    }),
  ],
}
