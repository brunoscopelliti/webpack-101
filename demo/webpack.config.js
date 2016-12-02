
const path = require('path');

const config = {

  // The entry point for the bundle.
  // The name is resolved to a module which is loaded upon startup.
  entry: './app/index.js',

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