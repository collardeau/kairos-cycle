var webpack = require('webpack');
var path = require('path');

module.exports = {

  entry: {

    app: [
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app', 'main.js')
    ]
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{ 
      test: /\.js$/, 
      loaders: ['babel'], 
      exclude: path.resolve(__dirname, 'node_modules'),
    }, 
  ]}

};
