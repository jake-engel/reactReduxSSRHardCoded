const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

const baseConfig = require('./webpack.base.js');

const serverConfig = {
  // Inform webpack we're building a webpack for nodeJS rather than for the browser
  target: 'node',

  // Tell webpack the root file of our server application
  entry: './src/index.js',

  // Tell webpack where to put the output file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // Tells webpack to not import any libraries in our server side bundle that exist in node_modules already
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, serverConfig);
