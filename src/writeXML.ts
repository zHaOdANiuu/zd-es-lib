import writeFile from './writeFile';

function writeXML(path: string | File, xml: XML): boolean
{
      return writeFile(path, xml.toXMLString());
}

export default writeXML;
