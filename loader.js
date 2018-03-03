function pitch(...args) {
  console.log('pitch')
  return
}

function loader(...args) {
  console.log('loader')
  return 'nya-n'
}

module.exports = {
  default: loader,
  pitch
}