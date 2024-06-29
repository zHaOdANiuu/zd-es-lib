/** 遍历文件夹下的所有文件 */
function eachFolder(folder: Folder, suffix: RegExp): File[] | []
{
      const result: File[] = [];
      const stack = new Stack<(Folder | File)[]>();
      stack.push(folder.getFiles());
      for (;;)
      {
            const data = stack.pop();
            if (!data) return result;
            const len = data.length;
            for (let i = -1; ++i < len;)
            {
                  const item = data[i];
                  if (item instanceof Folder) stack.push(item.getFiles());
                  else if (suffix.test(item.name)) result.push(item);
            }
      }
}

export default eachFolder;
