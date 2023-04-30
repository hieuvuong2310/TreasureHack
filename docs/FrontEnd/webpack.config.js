const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: './script.js',
    login: './Login.js',
    register: './Register.js',
    chat: './Chat.js',
  },
  output: {
    path: path.resolve(__dirname, '../backend/dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    sourceMapFilename: '[file].map'
  },
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './Home.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './Login.html',
      filename: 'login.html',
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      template: './Register.html',
      filename: 'register.html',
      chunks: ['register']
    }),
    new HtmlWebpackPlugin({
      template: './Chat.html',
      filename: 'chat.html',
      chunks: ['chat']
    }),
    new CopyPlugin({
      patterns: [
        { from: "./styles/*.css" },
      ]
    }),
  ]
};
