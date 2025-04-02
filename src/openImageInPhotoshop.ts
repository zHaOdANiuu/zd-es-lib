import { eachSelectedLayers } from './each'
import { isAVLayer } from './is'
import { isFile } from './os/is'
import notifyApp from './notifyApp'

/** 在ae里选择一个是图片素材的图层以后,调用此函数,将会用ps打开图片 */
function openImageInPhotoshop() {
  const appSpecifier = 'photoshop'
  eachSelectedLayers(layer => {
    if (!isAVLayer(layer)) {
      alert('请选择一个素材图层')
      return
    }
    const mainSource = layer.source.mainSource
    if (!isFile(mainSource.file)) {
      alert('素材图层没有文件源')
      return
    }
    const img = mainSource.file
    notifyApp(appSpecifier, 'app.open(' + img.toSource() + ')', () => {
      BridgeTalk.isRunning(appSpecifier)
        ? system.callSystem(BridgeTalk.getAppPath(appSpecifier))
        : BridgeTalk.bringToFront(appSpecifier)
    })
  })
}

export default openImageInPhotoshop
