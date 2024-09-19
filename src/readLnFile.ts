function readLnFile(file: File, callback: (data: string) => void | boolean, encoding?: FileEncoding)
{
      file.encoding = encoding || 'UTF-8';
      file.open('r');
      while (!file.eof) if (callback(file.readln())) break;
      file.close();
}

export default readLnFile;
