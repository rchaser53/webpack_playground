const path = require('path')
const redis = require("redis");

const cacheKey = () => {
  return Date.now()
}

const read = (key, callback) => {
  client = redis.createClient();
  client.on("error", (err) => {
    console.log("Error " + err);
  });

  client.get(key, (err, ret) => {
    client.quit();
    if (ret == null) {
      callback(new Error('cache not found'));
      return
    }
    if (err) throw new Error(err)
    callback(null, JSON.parse(ret));
  })
}

const write = (key, value, callback) => {
  client = redis.createClient();
  client.on("error", (err) => {
    console.log("Error " + err);
  });
  client.set(key, JSON.stringify(value), (err) => {
    client.quit();
    console.log('call set')
    if (err) throw new Error(err)
    callback();
  })    
}

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
            loader: 'cache-loader',
            options: {
              read,
              write
            }
          },
          {
            loader: path.resolve(__dirname, './loaderA.js')
          },
          {
            loader: path.resolve(__dirname, './loaderB.js')
          }
        ]
      }
    ]}
};