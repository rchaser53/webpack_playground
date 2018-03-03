const path = require('path')

module.exports = {
  entry: {
    index: "./ori/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./ori/dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  resolve: {
      extensions: ['.html', '.js']
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, './loaderA.js')
          },
          {
            loader: path.resolve(__dirname, './loaderB.js')
          }
        ]
        
      }
    ]},
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   chunks: ['index1', 'index2'],
    // }),
    // new ExtractTextPlugin("styles.css")
  ],
  externals: [
    // { Vue: true }
  ],
  // devServer: {
  //   contentBase: [path.join(__dirname, '/')]
  // }
};

	// context: path.resolve(__dirname, './src'),
  // devtool: 'inline-source-map',