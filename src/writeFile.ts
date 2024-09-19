import { isFile } from './base/const';

function writeFile(path: string | File, content: string, encoding?: FileEncoding): boolean
{
      const file = isFile(path) ? path : new File(path);
      const folder = file.parent;
      if (!folder.exists) folder.create();
      file.encoding = encoding || 'UTF-8';
      return file.open('w') && file.write(content) && file.close();
}

export default writeFile;
