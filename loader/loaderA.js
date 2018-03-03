function pitch(...args) {
  console.log('pitchA')
  return "funnulaba"
}

function loader(...args) {
  console.log('loaderB')
  return 'nya-n'
}

module.exports = {
  default: loader,
  pitch
}