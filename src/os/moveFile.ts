function moveFile(file: File, newPath: string) {
  if (file.exists) return file.rename(newPath)
  alert('Move failed: ' + file.fsName)
  return false
}

export default moveFile
