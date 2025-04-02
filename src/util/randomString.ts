import random from './random'

function randomString() {
  return (+random().toString().substring(2)).toString(32)
}

export default randomString
