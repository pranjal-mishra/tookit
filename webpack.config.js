var webpack = require('path');

module.exports = {
  entry:  {
    App: "./app/assets/scripts/App.js",
    Vendor: "./app/assets/scripts/Vendor.js",
    lazyload: "./app/assets/scripts/lazyload.js"
	
  },
  output: {
    path: __dirname + "/app/temp/scripts/",
    filename: "[name].js"
  }
  // ,
  // module: {
  //   loaders: [
  //     {
  //       loader: 'babel-loader',
  //       test: /\.js$/,
  //       query: {
  //         presets: ['es2015']
  //       },
  //       exclude: /node_modules/
  //     }
  //   ]
  // }
};