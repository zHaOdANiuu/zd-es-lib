interface __folder<T>
{
      folder: {
            path: string;
            files: string[];
            next: __folder<T>;
      };
}
interface __node<T>
{
      node: {
            id: string;
            lists: number[];
            next: __node<T>;
      };
}
type _folder = __folder<_folder>;
type _node = __node<_node>;

export class TreeViewExtends
{
      treeView: TreeView;
      constructor(treeView: TreeView)
      {
            this.treeView = treeView;
      }
      childDepth(element: ListItem | TreeViewNode | TreeView)
      {
            if (element instanceof TreeView) 0;
            let i = 0;
            let next = element;
            while (next.parent instanceof ListItem)
            {
                  next = (next.parent as unknown as ListItem | TreeViewNode);
                  ++i;
            }
            return i;
      }
      childPath(element: ListItem | TreeViewNode | TreeView)
      {
            let next = element;
            let depth = this.childDepth(next);
            if (depth === 0) return [];
            const result: number[] = [ (next as ListItem | TreeViewNode).index ];
            while (depth--)
            {
                  next = (next.parent as unknown as TreeViewNode);
                  result.push(next.index);
            }
            return result;
      }
      obtainChildByPath(path: number[])
      {
            let result: ListItem | undefined;
            let root = this.treeView.items;
            for (let i = -1, l = path.length; ++i < l;)
            {
                  const index = path[i];
                  if ((root[index] as TreeViewNode).items) root = (root[index] as TreeViewNode).items;
                  else result = root[index];
            }
            return result;
      }
      excludeNullEnviron<T>(callback: (item: ListItem) => T)
      {
            const element = this.treeView.selection;
            if (element !== null)
            {
                  callback(element);
                  return true;
            } return false;
      }
      nodeEnviron<T>(callback: (node: TreeViewNode, parent: treeViewElement) => T)
      {
            const element = this.treeView.selection;
            if ((element as TreeViewNode).items)
            {
                  callback((element as TreeViewNode), (element.parent as unknown as treeViewElement));
                  return true;
            }
            return false;
      }
      itemEnviron<T>(callback: (item: ListItem, parent: treeViewElement) => T)
      {
            const element = this.treeView.selection;
            if (element instanceof ListItem)
            {
                  callback(element, (element.parent as unknown as treeViewElement));
                  return true;
            }
            return false;
      }
      selectEnviron<T, U>(
                  callback: (node: TreeViewNode, parent: treeViewElement) => T,
                  callback2: (item: ListItem, parent: treeViewElement) => U
      )
      {
            this.nodeEnviron(callback) || this.itemEnviron(callback2);
      }
      addFolder(folder: Folder)
      {
            let index = -1;
            const files = folder.getFiles();
            const length = files.length;
            const result = {
                  folder: {
                        path:  '',
                        files: [],
                        next:  null
                  },
                  node: {
                        id:    '',
                        lists: [],
                        next:  null
                  }
            } as unknown as _folder & _node;
            while (++index < length)
            {
                  const file = files[index];
                  if (file instanceof File)
                  {
                        result.folder.files.push(file.absoluteURI);
                        result.node.lists.push(this.treeView.add('item', File.decode(file.name)).index);
                        continue;
                  }
                  result.folder.path += file.absoluteURI;
                  const node = this.treeView.add('node', File.decode(file.name)) as unknown as TreeViewNode;
                  result.node.id += node.index;
                  const recursion = this.addFolder(file);
                  result.folder.next = { folder: recursion.folder };
                  result.node.next = { node: recursion.node };
            }
            return result;
      }
}
