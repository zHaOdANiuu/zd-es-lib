import readFile from './readFile';

/**
 * 读取图片二进制数据,并转16进制
 */
function readImage(path: string | File): string | undefined
{
      let data = readFile(path, 'BINARY');
      if (data)
      {
            data = data.toSource();
            return data.substring(13, data.length - 3);
      }
}

export default readImage;
