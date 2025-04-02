import { isFolder } from '../os/is'
import duffEach from '../util/duffEach'

/**Add a folder to a tree view. */
function treeViewAddFolder(tree: TreeView | TreeViewNode, folder: Folder) {
  duffEach(folder.getFiles(), file => {
    const text = Folder.decode(file.name)
    isFolder(file)
      ? treeViewAddFolder(tree.add('node', text) as TreeViewNode, file)
      : tree.add('item', text)
  })
}

export default treeViewAddFolder
