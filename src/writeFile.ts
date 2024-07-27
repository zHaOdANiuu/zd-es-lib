function writeFile(path: string | File, content: string): boolean
{
      const file = path instanceof File ? path : new File(path);
      const folder = file.parent;
      if (!folder.exists) folder.create();
      return file.open('w') && file.write(content) && file.close();
}

export default writeFile;
