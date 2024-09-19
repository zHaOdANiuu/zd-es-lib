import readFile from './readFile';

function readXML(path: string | File): XML | undefined
{
      const data = readFile(path);
      if (data) return new XML(data);
}

export default readXML;
