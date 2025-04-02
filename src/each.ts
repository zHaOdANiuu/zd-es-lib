import { isPropertyGroup, isBuiltParamsPropertyGroup, isCompItem, isProperty } from './is'
import { getProperties } from './property'
import duffEach from './util/duffEach'

/** 对属性组进行递归遍历 */
export function eachPropertyGroup(
  element: Layer | PropertyGroup,
  callback: (property: Property) => void
) {
  const queue = [getProperties(element)]
  let data: _PropertyClasses[] | undefined
  for (; (data = queue.pop()); ) {
    duffEach(data, property => {
      isPropertyGroup(property)
        ? !isBuiltParamsPropertyGroup(property) && queue.push(getProperties(property))
        : property.canSetExpression && callback(property)
    })
  }
}
/** 对活动合成进行操作 */
export function activeCompItemEnviron(callback: (compItem: CompItem) => void) {
  const activeItem = app.project.activeItem
  isCompItem(activeItem) && callback(activeItem)
}
/** 对项目里的所有Item进行遍历 */
export function eachProjectItem(callback: (item: _ItemClasses) => void) {
  const items = app.project.items
  const len = items.length
  for (let i = 0; i < len; ) callback(items[++i])
}
/** 对项目里的所有图层进行操作 */
export function eachProjectLayers(callback: (layer: Layer) => void) {
  eachCompItems(compItem => eachCompItemLayers(compItem, layer => callback(layer)))
}
/** 对项目里的每个图层的每个属性进行操作 */
export function eachProjectLayersProperties(callback: (property: Property) => void) {
  eachProjectLayers(layer => eachPropertyGroup(layer, property => callback(property)))
}
/** 对项目里每个有表达式的属性进行操作 */
export function eachProjectLayersExpressionProperties(callback: (property: Property) => void) {
  eachProjectLayersProperties(
    property => property.expression !== '' && property.canSetExpression && callback(property)
  )
}
/** 对项目里的所有合成进行操作 */
export function eachCompItems(callback: (compItem: CompItem) => void) {
  eachProjectItem(item => isCompItem(item) && callback(item))
}
/** 对合成里的所有图层进行操作 */
export function eachCompItemLayers(compItem: CompItem, callback: (layer: Layer) => void) {
  const layers = compItem.layers
  const len = layers.length
  for (let i = 0; i < len; ) callback(layers[++i])
}
/** 对活动合成里的所有图层进行操作 */
export function eachActiveCompItemLayers(callback: (layer: Layer) => void) {
  return activeCompItemEnviron(activeItem => {
    duffEach(activeItem.layers as unknown as Layer[], layer => callback(layer))
  })
}
/** 对活动合成里的所有图层属性进行操作 */
export function eachActiveCompItemLayersProperties(callback: (property: Property) => void) {
  eachActiveCompItemLayers(layer => eachPropertyGroup(layer, property => callback(property)))
}
/** 对活动合成里的所有含有表达式的属性进行操作 */
export function eachActiveCompItemLayersExpressionProperties(
  callback: (property: Property) => void
) {
  eachActiveCompItemLayersProperties(
    property => property.expression !== '' && property.canSetExpression && callback(property)
  )
}
/** 对选择的所有合成进行操作 */
export function eachSelectedCompItems(callback: (compItem: CompItem) => void) {
  eachCompItems(compItem => compItem.selected && callback(compItem))
}
/** 对选择合成里的所有图层进行操作 */
export function eachSelectedCompItemLayers(callback: (layer: Layer) => void) {
  eachSelectedCompItems(activeItem => {
    duffEach(activeItem.layers as unknown as Layer[], layer => callback(layer))
  })
}
/** 对选择合成里的所有图层属性属性进行操作 */
export function eachSelectedCompItemLayersProperties(callback: (property: Property) => void) {
  eachSelectedCompItemLayers(layer => eachPropertyGroup(layer, property => callback(property)))
}
/** 遍历选择合成的所有图层的表达式进行操作 */
export function eachSelectedCompItemLayersExpressionProperties(
  callback: (property: Property) => void
) {
  eachSelectedCompItemLayersProperties(
    property => property.expression !== '' && property.canSetExpression && callback(property)
  )
}
/** 遍历选活动合成选择的图层 */
export function eachSelectedLayers(callback: (layer: Layer) => void) {
  activeCompItemEnviron(activeItem => {
    const selectedLayers = activeItem.selectedLayers
    const length = selectedLayers.length
    if (activeItem.selectedLayers.length > 0)
      for (let index = -1; ++index < length; ) callback(selectedLayers[index])
  })
}
/** 对活动合成里的所有选中图层的所有属性进行操作 */
export function eachSelectedLayersProperties(callback: (property: Property) => void) {
  eachSelectedLayers(layer => eachPropertyGroup(layer, property => callback(property)))
}
/** 对活动合成里的所有选中图层的所有有表达式的属性进行操作 */
export function eachSelectedLayersExpressionProperties(callback: (property: Property) => void) {
  eachSelectedLayersProperties(
    property => property.expression !== '' && property.canSetExpression && callback(property)
  )
}
/** 对活动合成选中的属性进行遍历 */
export function eachSelectedProperties(callback: (property: Property) => void) {
  activeCompItemEnviron(compItem => {
    if (compItem.selectedProperties.length < 1) return
    duffEach(compItem.selectedProperties, property => {
      isProperty(property) && property.canSetExpression && callback(property)
    })
  })
}
/** 遍历选择的关键帧 */
export function eachSelectedKeyframe(
  callback: (property: Property, selectedKeyframeID: number) => void
) {
  eachSelectedProperties(property => {
    const { selectedKeys } = property
    if (selectedKeys.length < 0) return
    const len = selectedKeys.length
    for (let i = 0; i < len; ++i) callback(property, selectedKeys[i])
  })
}
