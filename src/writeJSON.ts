import JSON from './global/JSON';
import writeFile from './writeFile';

function writeJSON(path: string | File, data: any): boolean
{
      return writeFile(path, JSON.stringify(data));
}

export default writeJSON;
