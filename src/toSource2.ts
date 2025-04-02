function toSource2(o: any) {
  const d = o.toSource()
  return d.substring(13, d.length - 2)
}

export default toSource2
