import { isProperty } from './is'
import getBounds from './math/getBounds'
import duffEach from './util/duffEach'
import forOwn from './util/forOwn'
import { isUndefined } from './util/is'

/** 添加蒙版 */
export function addMask(layer: AVLayer, mask?: Shape) {
  const maskGroup = layer.mask.addProperty('ADBE Mask Atom') as PropertyGroup
  if (mask) (maskGroup(1) as Property).setValue(mask)
  return maskGroup
}
/**
 * 添加大量属性
 * @param propertyGroup
 * @param propertyNames
 * @example
 * // 给形状层的组添加填充和描边属性,以&&分割属性名
 * addProperties(group,'fill&&stroke‘)
 */
export function addProperties(propertyGroup: PropertyGroup | Layer, propertyNames: string) {
  const A = propertyNames.split('&&')
  let i = -1
  const { length } = A
  while (++i < length) propertyGroup.addProperty(A[i])
}
/**
 * 查找属性组中的属性,以'/'为分隔符
 * @example findProperty(group, 'a/b/c')
 */
export function findProperty(group: PropertyGroup, path: string): _PropertyClasses {
  let i = -1
  const names = path.split('/')
  const { length } = names
  while (++i < length) (group as any) = group.property(names[i])
  return group
}
/**
 * 通过'/'分隔符获取属性组中的属性值
 * @example setPropertyValue(group, 'a/b/c', 100)
 */
export function setPropertyValue(propertyGroup: PropertyGroup, path: string, value: unknown) {
  let i = -1
  let result: Property | PropertyGroup = propertyGroup
  const keys = path.split('/')
  const len = keys.length
  while (++i < len) result = result.property(keys[i])
  isProperty(result) && result.setValue(value)
}
/** */

/** */
export function setPropertiesValues<T extends PropertyGroup>(
  propertyGroup: T,
  values: Record<Extract<keyof T, string>, any> | object
): void {
  forOwn(values, (v, k) => {
    const prop = propertyGroup.property(k)
    isProperty(prop) && prop.setValue(v)
  })
}
/** 通过属性返回属性对应的图层 */
export function getLayerByProperty(p: Property) {
  return p.propertyGroup(p.propertyDepth) as Layer
}
/** 通过属性返回属性所在的合成 */
export function getCompItemByProperty(p: Property) {
  return getLayerByProperty(p).containingComp
}
/** 以数组的数据结构返回属性组或者图层的所有属性 */
export function getProperties(p: Layer | PropertyGroup): _PropertyClasses[] {
  let i = 0
  const len = p.numProperties
  const result: _PropertyClasses[] = []
  while (i < len) result.push(p.property(++i))
  return result
}
/** */
function _updateRectForCoverage(
  points: TwoDPoint[],
  sourceRect: Record<'top' | 'left' | 'width' | 'height', number>
) {
  const bounds = getBounds(points)
  if (bounds[0] < sourceRect.left) sourceRect.left = bounds[0]
  if (bounds[1] < sourceRect.top) sourceRect.top = bounds[1]
  const w = bounds[2] - sourceRect.left
  const h = bounds[3] - sourceRect.top
  if (w > sourceRect.width) sourceRect.width = w
  if (h > sourceRect.height) sourceRect.height = h
}
/** 获得路径的边界矩形 */
export function getPathBounds(path: Shape, includeTangents?: boolean) {
  if (isUndefined(includeTangents)) includeTangents = false
  const { vertices } = path
  const sourceRect = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  }
  _updateRectForCoverage(vertices, sourceRect)
  if (includeTangents) {
    const { inTangents, outTangents } = path
    duffEach(vertices, (v, i) => {
      const inT = inTangents[i]
      const outT = outTangents[i]
      inTangents[i] = [inT[0] + v[0], inT[1] + v[1]]
      outTangents[i] = [outT[0] + v[0], outT[1] + v[1]]
    })
    _updateRectForCoverage(inTangents, sourceRect)
    _updateRectForCoverage(outTangents, sourceRect)
  }
  return [sourceRect.top, sourceRect.left, sourceRect.width, sourceRect.height]
}
