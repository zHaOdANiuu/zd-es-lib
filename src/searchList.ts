import { isTreeViewNode } from './base/const';
import duffDevice from './duffDevice';
import { map } from './lib/es5';

type DynamicNode = () => TreeViewNode | null | undefined;
interface ListBaseData
{
    readonly type: 'node' | 'item';
    readonly text: string;
    readonly image: string | File | ScriptUIImage;
}
interface TreeViewNodeData extends ListBaseData
{
    children: (TreeViewNodeData | ListBaseData)[];
}

const returnTreeViewNodeData = (e: TreeViewNode): TreeViewNodeData =>
{
      const result = returnBaseData(e) as TreeViewNodeData;
      result.children = map(e.items, k => returnListData(k));
      return result;
};
const returnBaseData = (e: TreeViewNode | ListItem): ListBaseData => ({ type: e.type as any, text: e.text, image: e.image });
const returnListData = (e: ListItem | TreeViewNode): ListBaseData | TreeViewNodeData => isTreeViewNode(e) ? returnTreeViewNodeData(e) : returnBaseData(e);
const buildTreeView = (p: TreeViewNode, e: TreeViewNodeData) =>
{
      duffDevice(e.children, k =>
      {
            const node = p.add(k.type, k.text);
            if (k.image) node.image = (k.image as any);
            if (node.type === 'node') buildTreeView(p, k as TreeViewNodeData);
      });
};
function searchList(searchBox: EditText, list: ListBox | TreeView | TreeViewNode | DynamicNode)
{
      let _list: () => ListBox | TreeView | TreeViewNode;
      if (typeof list === 'function')
      {
            if (!list()) return;
            _list = list as any;
      }
      else _list = () => list;
      const cache = map(_list().items, e => returnListData(e));
      searchBox.onChanging = function()
      {
            if (this.text.length < 0) return;
            const __list = _list();
            __list.removeAll();
            duffDevice(cache, e =>
            {
                  if (e.text.indexOf(searchBox.text) < 0) return;
                  const node = __list.add((e.type as any), e.text);
                  if (e.image) node.image = (e.image as any);
                  if (e.type === 'node') buildTreeView(node as TreeViewNode, e as TreeViewNodeData);
            });
      };
}

export default searchList;
