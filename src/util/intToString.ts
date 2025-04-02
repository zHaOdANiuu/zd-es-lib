import duffMap from './duffMap'

function intToString(array: number[]) {
  return duffMap(array, e =>
    String.fromCharCode(e & 255, (e >>> 8) & 255, (e >>> 16) & 255, (e >>> 24) & 255)
  )
    .join('')
    .replace(/\0/g, '')
}

export default intToString
