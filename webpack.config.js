const webpack = require('webpack');
const path = require("path");

module.exports = {
	context: path.resolve(__dirname, './src'),
  devtool: 'inline-source-map',
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
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
    new webpack.NoEmitOnErrorsPlugin()
  ],
  externals: [
    { Vue: true }
  ],
  devServer: {
    contentBase: [path.join(__dirname, '/')]
  }
};