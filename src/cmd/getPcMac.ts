/** 获得pc上所有mac地址 */
function getPcMac() {
  const data = system
    .callSystem($.os.indexOf('Win') === -1 ? 'ifconfig' : 'wmic nicconfig get macaddress')
    .match(
      /[0-9A-Z]{2}:[0-9A-Z]{2}:[0-9A-Z]{2}:[0-9A-Z]{2}:[0-9A-Z]{2}:[0-9A-Z]{2}/gi
    ) as RegExpMatchArray
  const result = []
  const l = data.length
  for (let i = 0; i < l; ++i) {
    result.push(data[i].replace(/[:]/g, ''))
  }
  return result
}

export default getPcMac
