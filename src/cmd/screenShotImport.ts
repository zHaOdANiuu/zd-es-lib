import { randomString } from '../global/const';

function screenShotImport()
{
      const folder = new Folder(Folder.desktop.fsName + '\\#Temp\\');
      if (!folder.exists) folder.create();
      const path = folder.fsName + '\\' + randomString() + '.png';
      system.callSystem('cmd /c "powershell -WindowStyle Hidden (Get-Clipboard -Format image).Save(\'' + path + '\') "');
      app.project.importFile(new ImportOptions(new File(path)));
}

export default screenShotImport;
