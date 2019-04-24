const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin')

const ENTRY_FILENAME = 'index.dev.js';
const SOURCE_PATH = path.join(__dirname, 'src', ENTRY_FILENAME);
const BUILD_PATH = path.join(__dirname, 'build');


module.exports = merge(common, {
  mode: 'development',
  entry: SOURCE_PATH,
  output: {
    filename: ENTRY_FILENAME,
    path: BUILD_PATH
  },
  watch: true,
  plugins: [
    new NodemonPlugin({
      watch: path.resolve('./build'),
      ignore: ['*.js.map'],
      verbose: false,
      script: path.join('./build', ENTRY_FILENAME)
    })
  ]
});