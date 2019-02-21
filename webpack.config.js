'use strict';

const webpack = require('webpack');
const path = require('path');
const APP_DIR = './src/';
const BUILD_DIR = './dist/';

module.exports = {
  entry: [
    path.resolve(APP_DIR, 'app.js'),
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8008',
  ],
  output: {
    path: path.resolve(__dirname, BUILD_DIR),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      loader: 'eslint',
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass?sourceMap',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.scss'],
  },
  devtool: 'eval',
  devServer: {
    inline: true,
    port: 8008,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
