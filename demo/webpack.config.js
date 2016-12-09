
const path = require('path');

const webpack = require('webpack');
const WebpackExtractText = require('extract-text-webpack-plugin');

const appFolder = path.resolve(__dirname, 'app');

const config = {

  // The entry point for the bundle.
  // The name is resolved to a module which is loaded upon startup.
  entry: {
    vendor: [ 'react', 'react-dom', 'redux', 'react-redux' ],
    app: './app/index.js'
  },

  // Options affecting the resolving of modules.
  resolve: {
    modules: [
      appFolder,
      'node_modules',
    ]
  },

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
      }, {
        test: /\.css$/,
        include: appFolder,
        loader: (
          process.env.NODE_ENV === 'development' ?
            'style-loader!css-loader?modules' :
            WebpackExtractText.extract({
              notExtractLoader: 'style-loader',
              loader: 'css-loader?modules&sourceMap'
            })
        )
      },
    ]

  },

  // Plugin extends the default behaviour of webpack compiler
  plugins: [

    // https://github.com/webpack/extract-text-webpack-plugin
    new WebpackExtractText({
      filename: './assets/stylesheets/style.css',
      disable: process.env.NODE_ENV === 'development',
      allChunks: true
    }),

    // http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: process.env.NODE_ENV === 'production' ?
      '[name].[chunkhash].js' : '[name].js',
    publicPath: '/assets/',
  },

  // Configuration for webpack-dev-server CLI
  devServer: {
    open: true,
  },

  devtool: 'cheap-source-map',

};

if (process.env.NODE_ENV === 'production'){

  config.plugins.push(
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
    })
  );

}

module.exports = config;