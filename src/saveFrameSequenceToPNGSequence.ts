import { activeCompItemEnviron } from './each'
import framesToTime from './util/framesToTime'
import timeToFrames from './util/timeToFrames'

/** 保存帧序列为PNG序列到文件夹,帧序列的开始和结束由工作区的开头和结束决定 */
function saveFrameSequenceToPNGSequence(folder: Folder) {
  activeCompItemEnviron(compItem => {
    const fps = compItem.frameRate
    let i = timeToFrames(compItem.workAreaStart, fps)
    const numFrames = timeToFrames(compItem.workAreaDuration, fps)
    while (i < numFrames) {
      compItem.saveFrameToPng(
        framesToTime(i, fps),
        new File(folder.fsName + '/' + compItem.name + '_#' + i.toString() + '.png')
      )
      ++i
    }
  })
}

export default saveFrameSequenceToPNGSequence
