import JSON from './global/JSON';
import readFile from './readFile';

function readJSON(path: string | File): Record<string, unknown> | void
{
      const data = readFile(path);
      if (data) return JSON.parse(data);
}

export default readJSON;
