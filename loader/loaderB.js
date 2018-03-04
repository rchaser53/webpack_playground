function pitch(remainingRequest, precedingRequest, data) {
  console.log('pitchB', remainingRequest, precedingRequest, data)
  data.pitchB = 22
  return
}

function loader(...args) {
  console.log('loaderB', args, this.data)
  // return Buffer("aaa")
  const callback = this.async();
  return callback(null, args[0], null)
}

module.exports = {
  default: loader,
  pitch
}