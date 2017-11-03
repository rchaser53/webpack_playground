const webpack = require('webpack');
const path = require("path");

module.exports = {
	context: path.resolve(__dirname, './src'),
  devtool: 'inline-source-map',
  entry: {
    index1: "./index1.js",
    index2: "./index2.js",
    index3: "./index3.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  resolve: {
      extensions: ['.html', '.js']
  },
  module: {
    rules:[{
      test: /\.(ts|tsx)$/,
      loaders:[
        'babel-loader'
      ],
      include: path.join(__dirname, 'src'),
      exclude:["node_modules/*"]
  }]},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['index1', 'index2'],
    })
  ],
  externals: [
    { Vue: true }
  ],
  devServer: {
    contentBase: [path.join(__dirname, '/')]
  }
};