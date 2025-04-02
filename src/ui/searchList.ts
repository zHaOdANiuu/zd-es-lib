import { isFunction } from '../util/is'
import { isTreeViewNode } from './is'
import duffEach from '../util/duffEach'
import duffMap from '../util/duffMap'

type DynamicNode = () => TreeViewNode | false
interface ListBaseData {
  readonly type: 'node' | 'item'
  readonly text: string
  readonly image: string | File | ScriptUIImage
}
interface TreeViewNodeData extends ListBaseData {
  readonly type: 'node'
  children: (TreeViewNodeData | ListBaseData)[]
}

const returnBaseData = (e: TreeViewNode | ListItem): ListBaseData => ({
  type: e.type as any,
  text: e.text,
  image: e.image
})
const returnListData = (e: ListItem | TreeViewNode): ListBaseData | TreeViewNodeData =>
  isTreeViewNode(e) ? returnTreeViewNodeData(e) : returnBaseData(e)
function returnTreeViewNodeData(e: TreeViewNode): TreeViewNodeData {
  const result = returnBaseData(e) as TreeViewNodeData
  result.children = duffMap(e.items, k => returnListData(k))
  return result
}
function addItem(p: TreeViewNode, e: TreeViewNodeData | ListBaseData) {
  const node = p.add(e.type, e.text)
  if (e.image) node.image = e.image
  e.type === 'node' && addItem(node as TreeViewNode, e as TreeViewNodeData)
}
/**
 * 用于搜索列表
 * @param {EditText} searchBox 搜索框
 * @param {ListBox|TreeView|TreeViewNode|DynamicNode} list 列表或树视图或树视图节点可以是动态节点
 * @example
 * // 动态节点示例
 * searchList(searchBox, () => isTreeViewNode(tree.selection) && tree.selection);
 */
function searchList(searchBox: EditText, list: ListBox | TreeView | TreeViewNode | DynamicNode) {
  let cache: (TreeViewNodeData | ListBaseData)[]
  let listData: TreeViewNode | ListBox | TreeView | false
  let tmpListData: Exclude<typeof listData, false>
  const getList = isFunction(list) ? list : () => list
  const getItems = () => duffMap((getList() as TreeView).items, e => returnListData(e))
  const upData = () => {
    duffEach(cache, e => {
      e.text.indexOf(searchBox.text) > -1 && addItem(listData as TreeViewNode, e)
    })
  }
  searchBox.onChanging = () => {
    listData = getList()
    if (searchBox.text.length < 0 || !listData) return
    if (tmpListData === listData) {
      listData.removeAll()
      upData()
    } else if (!cache) cache = getItems()
    else {
      tmpListData.removeAll()
      duffEach(cache, e => {
        addItem(tmpListData as TreeViewNode, e)
      })
      cache = getItems()
    }
    tmpListData = listData
  }
}

export default searchList
