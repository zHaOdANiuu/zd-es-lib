import { isFolder } from './base/const';
import { forEach } from './lib/es5';

function treeViewAddFolder(tree: TreeView | TreeViewNode, folder: Folder)
{
      forEach(folder.getFiles(), file =>
      {
            const text = Folder.decode(file.name);
            isFolder(file)
                  ? treeViewAddFolder(tree.add('node', text) as TreeViewNode, file)
                  : tree.add('item', text);
      });
}

export default treeViewAddFolder;
