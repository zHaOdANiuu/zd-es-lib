function writeFile(file: File, data: string, encoding?: FileEncoding) {
  file.encoding = encoding || 'UTF-8'
  return file.open('w') && file.write(data) && file.close()
}

export default writeFile
