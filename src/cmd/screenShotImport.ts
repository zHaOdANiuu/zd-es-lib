import { randomString } from '../base/const';

/** 截图导入ae */
function screenShotImport()
{
      const folder = Folder(Folder.desktop.fsName + '/#Temp/');
      if (!folder.exists) folder.create();
      const path = folder.fsName + '/' + randomString() + '.png';
      system.callSystem('cmd /c "powershell -WindowStyle Hidden (Get-Clipboard -Format image).Save(\'' + path + '\') "');
      app.project.importFile(new ImportOptions(File(path)));
}

export default screenShotImport;
