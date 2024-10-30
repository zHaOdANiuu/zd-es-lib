import { isListItem, isNull, isTreeViewNode } from '../base/const';

type TreeViewParent = TreeViewNode | TreeView;

class TreeViewExtends
{
      treeView: TreeView;
      constructor(treeView: TreeView)
      {
            this.treeView = treeView;
      }
      excludeNullEnviron<T>(callback: (item: ListItem) => T)
      {
            const element = this.treeView.selection;
            if (!isNull(element))
            {
                  callback(element);
                  return true;
            }
            return false;
      }
      nodeEnviron<T>(callback: (node: TreeViewNode, parent: TreeViewParent) => T)
      {
            const element = this.treeView.selection;
            if (isTreeViewNode(element))
            {
                  callback(element, element.parent);
                  return true;
            }
            return false;
      }
      itemEnviron<T>(callback: (item: ListItem, parent: TreeViewParent) => T)
      {
            const element = this.treeView.selection;
            if (isListItem(element))
            {
                  callback(element, (element as any).parent);
                  return true;
            }
            return false;
      }
      selectEnviron<T, U>(
            callback: (node: TreeViewNode, parent: TreeViewParent) => T,
            callback2: (item: ListItem, parent: TreeViewParent) => U
      )
      {
            this.nodeEnviron(callback) || this.itemEnviron(callback2);
      }
}

export default TreeViewExtends;
