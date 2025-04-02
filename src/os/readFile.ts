function readFile(file: File, encoding?: FileEncoding): string | false {
  file.encoding = encoding || 'UTF-8'
  if (!(file.exists && file.open('r'))) {
    return false
  }
  const data = file.read()
  file.close()
  return data
}

export default readFile
