var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./public')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('node_modules'),
      path.resolve('src')
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/)
  ]
}