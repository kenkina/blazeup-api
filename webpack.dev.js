const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const BUILD_PATH = path.join(__dirname, 'build');
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'index.js',
    path: BUILD_PATH
  },
  watch: true,
  plugins: [
    new NodemonPlugin({
      watch: path.resolve('./build'),
      ignore: ['*.js.map'],
      verbose: false,
      script: './build/index.js'
    })
  ]
});