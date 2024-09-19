import { isFolder } from './base/const';

function breadthTraversesFolders(folder: Folder, callback: (file: File) => void)
{
      for (const stack = [ folder.getFiles() ]; ;)
      {
            const data = stack.pop();
            if (!data) break;
            let i = -1;
            const { length } = data;
            while (++i < length)
            {
                  const item = data[i];
                  isFolder(item)
                        ? stack.push(item.getFiles())
                        : callback(item);
            }
      }
}

export default breadthTraversesFolders;
