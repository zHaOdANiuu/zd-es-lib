import { isFunction, isTreeViewNode } from './base/const';
import duffDevice from './duffDevice';
import { map } from './lib/es5';

type DynamicNode = () => TreeViewNode | false;
interface ListBaseData
{
    readonly type: 'node' | 'item';
    readonly text: string;
    readonly image: string | File | ScriptUIImage;
}
interface TreeViewNodeData extends ListBaseData
{
    readonly type: 'node';
    children: (TreeViewNodeData | ListBaseData)[];
}

/**
 * 用于搜索列表
 * @param {EditText} searchBox 搜索框
 * @param {ListBox|TreeView|TreeViewNode|DynamicNode} list 列表或树视图或树视图节点可以是动态节点
 * @example
 * // 动态节点示例
 * searchList(searchBox, () => isTreeViewNode(tree.selection) && tree.selection);
 */
const searchList = class
{
      constructor(searchBox: EditText, list: ListBox | TreeView | TreeViewNode | DynamicNode)
      {
            let cache: (TreeViewNodeData | ListBaseData)[];
            let listData: TreeViewNode | ListBox | TreeView | false;
            let tmpListData: Exclude<typeof listData, false>;
            const getList = isFunction(list) ? list : () => list;
            const getItems = () => map((getList() as TreeView).items, e => this.returnListData(e));
            const upData = () =>
            {
                  duffDevice(cache, e => { e.text.indexOf(searchBox.text) > -1 && this.addItem((listData as TreeViewNode), e); });
            };
            searchBox.onChanging = () =>
            {
                  listData = getList();
                  if (searchBox.text.length < 0 || !listData) return;
                  if (tmpListData === listData)
                  {
                        listData.removeAll();
                        upData();
                  }
                  else if (!cache) cache = getItems();
                  else
                  {
                        tmpListData.removeAll();
                        duffDevice(cache, e => { this.addItem((tmpListData as TreeViewNode), e); });
                        cache = getItems();
                  }
                  tmpListData = listData;
            };
      }
      private returnBaseData = (e: TreeViewNode | ListItem): ListBaseData => ({ type: e.type as any, text: e.text, image: e.image });
      private returnListData = (e: ListItem | TreeViewNode): ListBaseData | TreeViewNodeData => isTreeViewNode(e) ? this.returnTreeViewNodeData(e) : this.returnBaseData(e);
      private returnTreeViewNodeData = (e: TreeViewNode): TreeViewNodeData =>
      {
            const result = this.returnBaseData(e) as TreeViewNodeData;
            result.children = map(e.items, k => this.returnListData(k));
            return result;
      };
      private addItem = (p: TreeViewNode, e: TreeViewNodeData | ListBaseData) =>
      {
            const node = p.add(e.type, e.text);
            if (e.image) node.image = e.image;
            if (e.type === 'node') this.addItem((node as TreeViewNode), e as TreeViewNodeData);
      };
}.prototype.constructor;

export default searchList;
