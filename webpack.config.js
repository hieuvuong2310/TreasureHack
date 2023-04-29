const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './FrontEnd/script.js',
  output: {
    path: path.resolve(__dirname, 'FrontEnd', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './FrontEnd/Home.html',
      filename: 'index.html'
    })
  ]
};
