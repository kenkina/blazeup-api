const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENTRY_FILENAME = 'index.js';
const SOURCE_PATH = path.join(__dirname, 'src', ENTRY_FILENAME);
const BUILD_PATH = path.join(__dirname, 'dist');


module.exports = merge(common, {
  mode: 'production',
  entry: SOURCE_PATH,
  output: {
    filename: ENTRY_FILENAME,
    path: BUILD_PATH
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  }
});