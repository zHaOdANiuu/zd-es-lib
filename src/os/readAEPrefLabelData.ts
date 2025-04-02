import { hex2Rgb } from '../util/color'
import duffMap from '../util/duffMap'

function parseAEPrefLabel(str: string) {
  const reg = /"([^"]+)"/g
  return str.replace(reg, () => {
    const execResult = reg.exec(str)
    if (execResult) return execResult[0].charCodeAt(1).toString(16)
  }) as HexColorString
}
/** 读取首选项的颜色标签数据 */
function readAEPrefLabelData() {
  const appVersion = app.version.substring(0, 4)
  const initPath =
    Folder.userData.toString() +
    '/Adobe/After Effects/' +
    appVersion +
    '/Adobe After Effects ' +
    appVersion
  const prefPath = {
    zh_CN: initPath + ' 设置-indep-general.txt',
    en_US: initPath + ' Prefs-indep-general.txt'
  }
  const prefFile = new File(prefPath[app.isoLanguage as keyof typeof prefPath])
  const labelKeys: string[] = []
  prefFile.open('r')
  while (!prefFile.eof) {
    const str = prefFile.readln()
    if (str === '["Label Preference Color Section 5"]') {
      for (let i = -1; ++i < 16; ) {
        labelKeys.push(prefFile.readln())
      }
      break
    }
  }
  prefFile.close()
  return duffMap(
    labelKeys.slice(0, 1).concat(labelKeys.slice(8, 16), labelKeys.slice(1, 8)),
    value => hex2Rgb(parseAEPrefLabel(value.split(' = ')[1].slice(2)))
  )
}

export default readAEPrefLabelData
