const childProcess = require('child_process');
const fs = require('fs')

const data = { a: 2 }
const options = {
  nodeArgs: [],
  parallelJobs: 4
}

// let worker = childProcess.spawn(
//   'ls',
//   [].concat(options.nodeArgs || []),
//     // .concat(workerPath, options.parallelJobs),
//   {
//     stdio: ['ignore', 1, 2, 'pipe', 'pipe'],
//   }
// );
// const [, , , readPipe, writePipe] = worker.stdio;
// this.readPipe = readPipe;
// this.writePipe = writePipe;

const writePipe = fs.createWriteStream(null, { fd: 3 });
const readPipe = fs.createReadStream(null, { fd: 4 });
writePipe.on('error', console.error.bind(console));
readPipe.on('error', console.error.bind(console));

const lengthBuffer = new Buffer(4);
const messageBuffer = new Buffer(JSON.stringify(data), 'utf-8');
lengthBuffer.writeInt32BE(messageBuffer.length, 0);

const buffers = [];
const onChunk = (arg) => {
  let chunk = arg;
  let overflow;
  // if (chunk.length > remainingLength) {
  //   overflow = chunk.slice(remainingLength);
  //   chunk = chunk.slice(0, remainingLength);
  //   remainingLength = 0;
  // } else {
  //   remainingLength -= chunk.length;
  // }
  console.log(1, arg, 2)
  buffers.push(chunk);
  // if (remainingLength === 0) {
    // readPipe.pause();
  readPipe.removeListener('data', onChunk);
  //   if (overflow) {
  //     readPipe.unshift(overflow);
  //   }
  //   callback(null, Buffer.concat(buffers, length));
  // }
  // process.nextTick(() => writePipe.uncork());
}


readPipe.on('data', onChunk);

writePipe.cork();
writePipe.write(lengthBuffer);
writePipe.write(messageBuffer);
process.nextTick(() => writePipe.uncork());