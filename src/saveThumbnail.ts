/**
 * 保存合成的缩略图
 * @param file 保存的文件
 * @param maxRes 分辨率
 * @param time 要保存帧的所在时间
 * @param comp 合成
 */
function saveThumbnail(file: File, maxRes: number[], time: number, comp: CompItem)
{
      const currentResolution = comp.resolutionFactor
      let newFactor = Math.ceil(comp.width / maxRes[0])
      const test = Math.ceil(comp.height / maxRes[1])
      if (test > newFactor) newFactor = test
      comp.resolutionFactor = [ newFactor, newFactor ]
      comp.saveFrameToPng(time, file)
      comp.resolutionFactor = currentResolution
}

export default saveThumbnail
