import readFile from './readFile';

function readXML(path: string | File): XML | undefined
{
      const data = readFile(path);
      if (data) return XML(data);
}

export default readXML;
