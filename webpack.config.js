var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var CONFIG = require('./config/config')[env];
var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');


var definePlugin = new webpack.DefinePlugin({
  'process.env': {
    'URL': JSON.stringify(CONFIG.host)
  }
});





var config = {
  entry: [
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  },
  plugins: [definePlugin]
};



module.exports = config;
