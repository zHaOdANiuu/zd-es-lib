import { isFolder } from './base/const';
import duffDevice from './duffDevice';

function deeplyTraverseFolder(folder: Folder, callback: (file: File) => void)
{
      duffDevice(folder.getFiles(), file =>
      {
            isFolder(file)
                  ? deeplyTraverseFolder(file, callback)
                  : callback(file);
      });
}

export default deeplyTraverseFolder;
