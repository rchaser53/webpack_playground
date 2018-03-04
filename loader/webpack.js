const webpack = require('webpack');
const config = require('./webpack.config');

const start = Date.now();
webpack([config], (err, _) => {
  if (err) {
    throw new Error(err);
  }
  console.log(Date.now() - start);
  process.exit(0);
});