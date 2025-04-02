import readFile from './os/readFile'
import writeFile from './os/writeFile'
import { SUPPORT_FILES } from './util/const'

/**
 * 更改ae语言
 * @param language 语言标识符，如 zh_CN
 */
function changeAeLanguage(language: `${string}_${string}`) {
  const languageFile = new File(SUPPORT_FILES.fsName + '/AMT/application.xml')
  const data = readFile(languageFile)
  if (!data) {
    alert('Read application.xml failed. Please check if the file exists and is not damaged.')
    return
  }
  const XMLData = new XML(data)
  ;(XMLData as any).xpath("/Payload/Data[@key='installedLanguages']")[0] = language
  writeFile(languageFile, '<?xml version="1.0" encoding="utf-8"?>\n' + XMLData.toXMLString())
  alert('Language changed successfully. Please restart After Effects.')
}

export default changeAeLanguage
