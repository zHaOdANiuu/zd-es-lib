import { timeToFrames, framesToTime } from '../index';
import { activeCompItemEnviron } from './Ae';
import { padStart } from './lib/es8';

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
                        new File(`${folder.fsName}/${compItem.name}_#${padStart(i.toString(), 4, '0')}.png`)
                  );
                  ++i;
            }
      });
}

export default saveFrameSequenceToPNGSequence;
