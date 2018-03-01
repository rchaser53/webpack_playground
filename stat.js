const fs = require('fs')
const async = require('neo-async');

const depA = {
  path: 'index.html',

}

fs.stat('index.html', function (statErr, stats) {
  if (statErr) {
    throw new Error(statErr)
  }
  console.log(stats.mtime.getTime())
});
