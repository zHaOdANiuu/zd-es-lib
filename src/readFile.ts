function readFile(path: string | File, encoding: FileEncoding = 'UTF-8'): string | void
{
      const file = path instanceof File ? path : new File(path);
      if (file.exists)
      {
            file.encoding = encoding;
            file.open('r');
            const data = file.read();
            file.close();
            return data;
      }
}

export default readFile;
