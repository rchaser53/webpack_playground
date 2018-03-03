function pitch(...args) {
  console.log('pitchB')
  return "gyohe-"
}

function loader(...args) {
  console.log('loaderB')
  return 'nya-n'
}

module.exports = {
  default: loader,
  pitch
}