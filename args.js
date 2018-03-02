const PARALLEL_JOBS = +process.argv[2];


const asyncQueue = require('async/queue');

const queue = asyncQueue(({ id, data }, taskCallback) => {
  console.log(id, data);
  taskCallback();
}, PARALLEL_JOBS);

queue.push({ id: 1, data: 'dataA'});
console.log('aaa')
queue.push({ id: 2, data: 'dataB'});
queue.push({ id: 3, data: 'dataC'});