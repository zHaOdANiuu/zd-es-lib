/** 遍历文件夹下的所有文件 */
function getFolderAllFile(folder: Folder, suffix: RegExp): File[] | []
{
      for (const result: File[] = [], stack = [ folder.getFiles() ]; ;)
      {
            const data = stack.pop();
            if (!data) return result;
            let i = -1;
            const len = data.length;
            while (++i < len)
            {
                  const item = data[i];
                  item instanceof Folder ? stack.push(item.getFiles()) : suffix.test(item.name) && result.push(item);
            }
      }
}

export default getFolderAllFile;
