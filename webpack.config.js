const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname),
    filename: './bundle.js',
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};