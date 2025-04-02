import { isFolder } from '../os/is'

/**
 * 广度遍历文件夹
 * @param folder 文件夹
 * @param callback 回调函数,参数为文件
 * @example
 * breadthTraversesFolders(folder, f => {
 *   alert(f.name);
 * });
 */
function breadthTraversesFolders(folder: Folder, callback: (f: File) => void) {
  let i: number, data: (Folder | File)[] | undefined, length: number, item: Folder | File
  for (const stack = [folder.getFiles()]; ; ) {
    data = stack.pop()
    if (!data) break
    i = -1
    length = data.length
    while (++i < length) {
      item = data[i]
      isFolder(item) ? stack.push(item.getFiles()) : callback(item)
    }
  }
}

export default breadthTraversesFolders
