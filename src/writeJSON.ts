function writeJSON(path: string | File, data: any): boolean
{
      return writeFile(path, JSON.stringify(data));
}

export default writeJSON;
