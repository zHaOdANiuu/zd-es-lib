/** 打开文件在资源管理器的位置 */
const openFileLocation = (f: File) => {
  system.callSystem('explorer ' + f.parent.fsName)
}

export default openFileLocation
