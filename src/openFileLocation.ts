function openFileLocation(f: File)
{
      system.callSystem('explorer ' + f.parent.fsName);
}

export default openFileLocation;
