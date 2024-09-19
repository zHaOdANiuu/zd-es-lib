import { map } from './lib/es5';

function temporalEaseToKeyframeEase(KeyframeEaseArr: KeyframeEase[])
{
      return map(KeyframeEaseArr, v => new KeyframeEase(v.speed, v.influence)) as [KeyframeEase];
}

export default temporalEaseToKeyframeEase;
