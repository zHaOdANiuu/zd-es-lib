import { trimEnd } from '../lib/es5';

function getClipboard()
{
      return trimEnd(system
            .callSystem('cmd /c "for /f %i in (\'powershell -WindowStyle Hidden Get-Clipboard\') do set r=%i"')
            .substring(Folder.startup.toString().length + 1));
}

export default getClipboard;
