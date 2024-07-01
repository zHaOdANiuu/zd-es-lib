function readImage(path: string | File): string | void
{
      const data = readFile(path, 'BINARY');
      if (data) return data.toSource().substring(12, data.length - 2);
}

export default readImage;
