const path = require('path')
const redis = require("redis");

const cacheKey = () => {
  return Date.now()
}

// const client = redis.createClient();
// client.on("error", (err) => {
//   console.log("Error " + err);
// });

// const read = (key, callback) => {
//   client.get(key, (err, ret) => {
//     if (ret == null) {
//       callback(new Error('cache not found'));
//       return
//     }
//     if (err) throw new Error(err)
//     callback(null, JSON.parse(ret));
//   })
// }

// const write = (key, value, callback) => {
//   client.set(key, JSON.stringify(value), (err) => {
//     console.log('call set')
//     if (err) throw new Error(err)
//     callback();
//   })
// }

module.exports = {
  devtool: 'inline-source-map',
  // mode: 'development',
  // mode: 'production',
  entry: {
    index: path.resolve(__dirname, "../ori/index.js")
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
    // rules:[
    //   {
    //     test: /\.js$/,
    //     loader: 'babel-loader',
    //   }
    // ]

    rules:[
      {
        test: /\.js$/,
        use: [
          // {
          //   loader: 'cache-loader',
          //   // options: {
          //   //   read,
          //   //   write
          //   // }
          // },
          {
            loader: path.resolve(__dirname, './loaderA.js')
          },
          {
            loader: path.resolve(__dirname, './loaderB.js')
          }
        ]
      }
    ]
  }
};