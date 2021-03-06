const nodeExternals = require('webpack-node-externals'); // Exclude node_module


module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',

            // Below are the fallback options
            name: '[name].[ext]',
            publicPath: '/public/images',
            outputPath: 'public/images'
          }
        }]
      },
      {
        test: /\.(zip)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/public/files',
            outputPath: 'public/files'
          }
        }]
      },
      {
        test: /\.(html)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/public/pages',
            outputPath: 'public/pages'
          }
        }]
      }
    ]
  },
  plugins: [
  ]
}