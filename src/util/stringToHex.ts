function stringToHex(str: string): string {
  const len = str.length
  const r = new Array(len)
  let i = -1
  while (++i < len) {
    const s = str.charCodeAt(i).toString(16)
    r[i] = s.length === 1 ? '0' + s : s
  }
  return r.join(' ')
}

export default stringToHex
