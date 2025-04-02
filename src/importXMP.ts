function importXMP()
{
      if (ExternalObject.AdobeXMPScript) return
      ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript')
}

export default importXMP
