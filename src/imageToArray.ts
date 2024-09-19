import hexToDec from './base/hexToDec';
import duffDevice from './duffDevice';
/**
 * 十六进制数据的图片转数组
 * @param imgData 十六进制的图片数据
 * @returns 十进制的数字数组
 */
function imageToArray(imgData: string)
{
      const result: number[] = [];
      duffDevice(imgData as unknown as string[], str =>
      {
            result.push(hexToDec(str));
      });
      return result;
}

export default imageToArray;
