import { isFolder } from './base/const';

/**
 * 广度遍历文件夹,不返回扁平化的文件数组,通过回调操作文件
 * @param folder 文件夹
 * @param callback 回调函数,参数为文件
 * @example
 * breadthTraversesFolders(folder, f => {
 *   alert(f.name);
 * });
 */
function breadthTraversesFolders(folder: Folder, callback: (f: File) => void)
{
      for (const stack = [ folder.getFiles() ]; ;)
      {
            const data = stack.pop();
            if (!data) break;
            let i = -1;
            const { length } = data;
            while (++i < length)
            {
                  const item = data[i];
                  isFolder(item)
                        ? stack.push(item.getFiles())
                        : callback(item);
            }
      }
}

export default breadthTraversesFolders;
