/** 重命名文件 */
function renameFile(file: File, newName: string): boolean {
  if (!file.exists) {
    alert('File not exists')
    return false
  }
  if (/\/|\\/.test(newName)) {
    alert('Invalid file name')
    return false
  }
  return file.rename(newName)
}

export default renameFile
