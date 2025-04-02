function copyFile(sourceFile: File, targetPath: string): boolean {
  if (!sourceFile.exists) {
    return false
  }
  if (sourceFile.fullName === targetPath) {
    return false
  }
  return sourceFile.copy(targetPath)
}

export default copyFile
