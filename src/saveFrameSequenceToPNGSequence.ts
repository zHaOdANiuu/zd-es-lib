import { activeCompItemEnviron } from './Ae';
import timeToFrames from './timeToFrames';

function saveFrameSequenceToPNGSequence(file: File)
{
      activeCompItemEnviron(compItem =>
      {
            let i = timeToFrames(compItem.workAreaStart, compItem.frameRate);
            const numFrames = timeToFrames(compItem.workAreaDuration, compItem.frameRate);
            while (++i < numFrames) compItem.saveFrameToPng(i, file);
      });
}

export default saveFrameSequenceToPNGSequence;
