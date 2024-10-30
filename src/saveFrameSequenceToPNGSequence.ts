import { framesToTime, timeToFrames } from './base/const';
import { padStart } from './lib/es8';
import { activeCompItemEnviron } from './Ae';

/** 保存帧序列为PNG序列到文件夹,帧序列的开始和结束由工作区的开头和结束决定 */
function saveFrameSequenceToPNGSequence(folder: Folder)
{
      activeCompItemEnviron(compItem =>
      {
            const fps = compItem.frameRate;
            let i = timeToFrames(compItem.workAreaStart, fps);
            const numFrames = timeToFrames(compItem.workAreaDuration, fps);
            while (i < numFrames)
            {
                  compItem.saveFrameToPng(
                        framesToTime(i, fps),
                        File(`${folder.fsName}/${compItem.name}_#${padStart(i.toString(), 4, '0')}.png`)
                  );
                  ++i;
            }
      });
}

export default saveFrameSequenceToPNGSequence;
