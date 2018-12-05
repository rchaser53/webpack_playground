const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path')
// const redis = require("redis");

const fs = require('fs')
const zlib = require('zlib')

// const cacheKey = () => {
//   return Date.now()
// }

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

const read = function(filename, callback) {
  return fs.readFile(filename, (err, data) => {
    if (err) return callback(err);

    return zlib.gunzip(data, (err, content) => {
      if (err) return callback(err);

      let result = Object.create(null);

      try {
        result = JSON.parse(content);
      } catch (e) {
        return callback(e);
      }

      return callback(null, result);
    });
  });
};

const write = (filename, result, callback) => {
  var content = JSON.stringify(result);
  return zlib.gzip(content, function (err, data) {
    if (err) return callback(err);
    return fs.writeFile(filename, data, (err) => {
      if (err) throw new Error(err)
      callback()
    });
  });
}

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
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
    extensions: ['.html', '.js'],
  },
  plugins: [new BundleAnalyzerPlugin()],
  devServer: {
    port: 3000,
  },
  module: {
    // rules:[
    //   {
    //     test: /\.js$/,
    //     loader: 'babel-loader',
    //   }
    // ]



    rules:[
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         cacheDirectory: path.join(__dirname, 'babel-loader')
      //       }
      //     },
      //     {
      //       loader: path.resolve(__dirname, './loaderA.js')
      //     },
      //   ]

      // },
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
            loader: 'eslint-loader',
            options: { fix: true, failOnError: true, parserOptions: { ecmaVersion: 2017 } },
          },
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