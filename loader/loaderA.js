function pitch(remainingRequest, precedingRequest, data) {
  data.pitchA = 42;
  console.log('pitchA', remainingRequest, precedingRequest, data)
  return
}

function loader(...args) {
  console.log('loaderB', args, this.data)
  return args[0]
}

module.exports = {
  default: loader,
  pitch,
}