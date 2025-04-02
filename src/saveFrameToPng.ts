import { activeCompItemEnviron } from './each'

function saveFrameToPng(): File | null {
  let png: File | null = null
  activeCompItemEnviron(compItem => {
    png = new File(Folder.desktop.fsName + '/' + compItem.name + '.png')
    compItem.saveFrameToPng(compItem.time, png)
  })
  return png
}

export default saveFrameToPng
