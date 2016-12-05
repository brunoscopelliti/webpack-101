
const path = require('path');

const webpack = require('webpack');

const appFolder = path.resolve(__dirname, 'app');

const config = {

  // The entry point for the bundle.
  // The name is resolved to a module which is loaded upon startup.
  entry: './app/index.js',


  module: {

    // Loaders allow you to preprocess files as you require() or "load" them. 
    // Loaders are kind of like "tasks" are in other build tools,
    // and provide a powerful way to handle frontend build steps. 
    rules: [
      {
        test: /\.js$/,
        include: appFolder,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        include: appFolder,
        loader: path.resolve(__dirname, 'loaders', 'use-strict-loader')
      }, {
        test: /\.json$/,
        include: appFolder,
        loader: path.resolve(__dirname, 'loaders', 'custom-json-loader'),

        // It's possible to configure the loader by specifing parameters
        query: "tabSize=2"
      },
    ]

  },

  // Plugin extends the default behaviour of webpack compiler
  plugins: [

    // webpack uglify
    // minimize the whole bundle
    // https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      }
    }),

  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'app.js',
    publicPath: '/assets/',
  },

  // Configuration for webpack-dev-server CLI
  devServer: {
    open: true,
  },

};

module.exports = config;