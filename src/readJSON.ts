import JSON from './global/JSON';
import readFile from './readFile';

function readJSON(path: string | File): AnyObject | undefined
{
      const data = readFile(path);
      if (data) return JSON.parse(data);
}

export default readJSON;
