import { isFile } from './base/const';

/** 读取成功返回数据,读取失败返回false */
function readFile(path: string | File, encoding?: FileEncoding): string | false
{
      const file = isFile(path) ? path : File(path);
      if (file.exists && file.open('r'))
      {
            file.encoding = encoding || 'UTF-8';
            const data = file.read();
            return file.close() && data;
      }
      return false;
}

export default readFile;
