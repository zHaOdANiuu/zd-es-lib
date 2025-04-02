import { isFolder } from '../os/is'
import duffEach from './duffEach'

/**
 * 深度遍历文件夹
 * @param folder 要遍历的文件夹
 * @param callback 回调函数
 */
function deeplyTraverseFolder(folder: Folder, callback: (file: File) => void) {
  duffEach(folder.getFiles(), f => {
    isFolder(f) ? deeplyTraverseFolder(f, callback) : callback(f)
  })
}

export default deeplyTraverseFolder
