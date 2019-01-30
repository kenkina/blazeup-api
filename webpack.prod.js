const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const BUILD_PATH = path.join(__dirname, 'dist');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'index.js',
    path: BUILD_PATH
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  }
});