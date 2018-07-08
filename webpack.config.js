const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        // query:{presets:['react']}
        // options: {
        //   presets: ['react']
        // }
      }
    ]
  },
  // resolve: {
  //   extensions: ['*', '.js', '.jsx'],
  //   modules:[
  //     'node_modules',
  //     path.resolve('./'),
  //   ]
  // },
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'index.bundle.js'
  },
  // mode: 'development',
  // module: {
  //   rules: [
  //     {
  //       test: /\.(js|jsx)$/,
  //       exclude: /node_modules/,
  //       use: ['babel-loader']
  //     }
  //   ]
  // },
  // resolve: {
  //   extensions: ['*', '.js', '.jsx'],
  //   modules:[
  //     'node_modules',
  //     path.resolve('./'),
  //   ]
  // },
  // entry: './js/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'public/js'),
  //   filename: 'index.bundle.js'
  // },
};