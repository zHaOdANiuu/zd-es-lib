const HEX_CHARACTERS = '0123456789abcdef'

function hexToString(str: string): string {
  if (str.length % 2 !== 0) str += '0'
  const result = []
  const len = str.length
  for (let i = 0; i < len; i += 2) {
    const id1 = HEX_CHARACTERS.indexOf(str[i])
    const id2 = HEX_CHARACTERS.indexOf(str[i + 1])
    if (id1 === -1 || id2 === -1) throw new Error('Hex is broken')
    result.push(String.fromCharCode((id1 << 4) | id2))
  }
  return result.join('')
}

export default hexToString
