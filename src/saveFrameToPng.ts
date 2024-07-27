import { activeCompItemEnviron } from './Ae';

function saveFrameToPng(file: File)
{
      activeCompItemEnviron(compItem => compItem.saveFrameToPng(compItem.time, file));
}

export default saveFrameToPng;
