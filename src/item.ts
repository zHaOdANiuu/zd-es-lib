import { eachCompItemLayers, eachCompItems } from './each'
import { writeAeExpression } from './expression'
import {
  getLayerRelation,
  addShapeLayer,
  addNullLayer,
  setLayerParent,
  layerTranslate
} from './layer'
import { addMask } from './property'
import { isUndefined } from './util/is'

/**
 * 将合成中的所有孤立图层链接到一个图层
 * @param layer 父图层
 * @param includeLockedLayers 是否引入锁定的图层
 */
export function layersParentAllOrphans(layer: Layer, includeLockedLayers?: boolean) {
  if (isUndefined(includeLockedLayers)) includeLockedLayers = false
  eachCompItemLayers(layer.containingComp, l => {
    if (l === layer) return
    const relation = getLayerRelation(l, layer)
    if (relation && relation < 0) return
    const locked = l.locked
    if (locked && includeLockedLayers) l.locked = false
    if (!locked && l.parent === null) l.parent = layer
    if (locked && includeLockedLayers) l.locked = locked
  })
}
/** 通过名字查找活动合成*/
export function findCompItem(name: string): CompItem | undefined {
  const result: CompItem[] = []
  eachCompItems(item => item.name === name && result.push(item))
  return result.length === 1 ? result[0] : result.pop()
}
/** 裁剪合成 */
export function cropCompItem(bounds: number[], comp: CompItem) {
  const n = addShapeLayer(comp)
  n.transform.position.setValue([0, 0])
  layersParentAllOrphans(n, true)
  n.transform.position.setValue([-bounds[1], -bounds[0]])
  n.remove()
  comp.width = bounds[2] >> 0
  comp.height = bounds[3] >> 0
}
/** 自适应裁剪合成，裁剪的 rgb 数据所在的时间段为参数 comp 的时间 */
export function reCropCompItem(comp: CompItem) {
  const temp = comp.duplicate()
  const maskPath = addMask(comp.layers.add(temp))(1) as Property
  writeAeExpression(maskPath, include => include('createAlphaRectanglePath'))
  const shape = maskPath.value as Shape
  temp.remove()
  const { vertices } = shape
  cropCompItem(
    [
      vertices[0][1],
      vertices[0][0],
      vertices[1][0] - vertices[0][0],
      vertices[2][1] - vertices[1][1]
    ],
    comp
  )
}
/**
 * 自适应设置合成的持续时间，并保持所有图层的持续时间不变
 * @param comp 合成
 * @param duration 持续事件
 */
export function reSetCompItemDuration(comp: CompItem, duration: number) {
  comp.duration < duration &&
    eachCompItemLayers(comp, l => {
      const locked = l.locked
      l.locked = false
      if (l.outPoint >= comp.duration) l.outPoint = duration
      l.locked = locked
    })
  comp.duration = duration
}
/**
 * 自适应设置合成的大小，并保持所有图层的位置不变
 * @param comp 合成
 * @param width 宽度
 * @param height 高度
 */
export function reSetCompItemSize(comp: CompItem, width: number, height: number) {
  const n = addNullLayer(comp)
  eachCompItemLayers(comp, l => {
    setLayerParent(l, n)
  })
  const offset: TwoDPoint = [0, 0]
  offset[0] = (width - comp.width) / 2
  offset[1] = (height - comp.height) / 2
  layerTranslate(n, offset)
  n.remove()
}
