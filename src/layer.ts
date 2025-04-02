import {
  executeCopyWithPropertyLinksCommand,
  executeCopyCommand,
  executePasteCommand
} from './command'
import { AE_LAYER_TYPE, APP_VERSION } from './const'
import { eachCompItemLayers, eachPropertyGroup } from './each'
import {
  isTextLayer,
  isShapeLayer,
  isLightLayer,
  isCameraLayer,
  isSolidSource,
  isCompItem,
  isShape
} from './is'
import { getPathBounds } from './property'
import duffEach from './util/duffEach'

import { isUndefined, isNull } from './util/is'

export function addTextLayer(comp: CompItem) {
  return comp.layers.addText('')
}

export function addShapeLayer(comp: CompItem) {
  return comp.layers.addShape()
}

export function addSolidLayer(color: ThreeDColorValue, comp: CompItem) {
  return comp.layers.addSolid(color, 'Solid', comp.width, comp.height, 1)
}

export function addNullLayer(comp: CompItem) {
  return comp.layers.addNull()
}

export function addAdjustmentLayer(comp: CompItem) {
  const l = addSolidLayer([0, 0, 0], comp)
  l.name = 'Adjustment Layer'
  l.label = 5
  l.adjustmentLayer = true
  return l
}

export function addCameraLayer(comp: CompItem) {
  return comp.layers.addCamera('Camera', [comp.width, comp.height])
}

export function addLightLayer(comp: CompItem) {
  return comp.layers.addLight('Light', [comp.width, comp.height])
}
/** 对齐位置 */
export function alignLayerPosition(layer: Layer, target: Layer) {
  const layerParent = layer.parent
  if (layerParent !== target) layer.parent = target
  const comp = layer.containingComp
  if (layer.transform.position.dimensionsSeparated) {
    const xpos = layer.transform.property('ADBE Position_0') as Property
    if (xpos.numKeys === 0) xpos.setValue(target.transform.anchorPoint.value[0])
    else xpos.setValueAtTime(comp.time, target.transform.anchorPoint.value[0])
    const ypos = layer.transform.property('ADBE Position_1') as Property
    if (ypos.numKeys === 0) ypos.setValue(target.transform.anchorPoint.value[1])
    else ypos.setValueAtTime(comp.time, target.transform.anchorPoint.value[1])
  } else {
    if (layer.transform.position.numKeys === 0)
      layer.transform.position.setValue(target.transform.anchorPoint.value)
    else layer.transform.position.setValueAtTime(comp.time, target.transform.anchorPoint.value)
  }
  if (layerParent !== target) layer.parent = layerParent
}
/** 对齐方向 */
export function alignLayerOrientation(layer: Layer, target: Layer) {
  const layerParent = layer.parent
  if (layerParent !== target) layer.parent = target
  const comp = layer.containingComp
  if (layer.transform.rotation.numKeys === 0) layer.transform.rotation.setValue(0)
  else layer.transform.rotation.setValueAtTime(comp.time, 0)
  if (layerParent !== target) layer.parent = layerParent
}
/** 对齐缩放 */
export function alignLayerScale(layer: Layer, target: Layer) {
  const layerParent = layer.parent
  if (layerParent !== target) layer.parent = target
  const comp = layer.containingComp
  if (layer.transform.scale.numKeys === 0) layer.transform.scale.setValue([100, 100])
  else layer.transform.scale.setValueAtTime(comp.time, [100, 100])
  if (layerParent !== target) layer.parent = layerParent
}
/** 对齐透明度 */
export function alignLayerOpacity(layer: Layer, target: Layer) {
  const comp = layer.containingComp
  if (layer.transform.opacity.numKeys === 0)
    layer.transform.opacity.setValue(target.transform.opacity.value)
  else layer.transform.opacity.setValueAtTime(comp.time, target.transform.opacity.value)
}
/** 对齐图层 */
export function alignLayer(
  layers: Layer[],
  target: Layer,
  position?: boolean,
  rotation?: boolean,
  scale?: boolean,
  opacity?: boolean
) {
  if (isUndefined(position)) position = true
  if (isUndefined(rotation)) rotation = true
  if (isUndefined(scale)) scale = true
  if (isUndefined(opacity)) opacity = false
  const targetParent = target.parent
  target.parent = null
  duffEach(layers, layer => {
    if (layer === target) return
    if (position) alignLayerPosition(layer, target)
    if (rotation) alignLayerOrientation(layer, target)
    if (scale) alignLayerScale(layer, target)
    if (opacity) alignLayerOpacity(layer, target)
  })
  target.parent = targetParent
}
/** 获得图层的类型 */
export function getLayerType(layer: Layer) {
  if (isTextLayer(layer)) return AE_LAYER_TYPE.TEXT
  if (isShapeLayer(layer)) return AE_LAYER_TYPE.SHAPE
  if (isLightLayer(layer)) return AE_LAYER_TYPE.LIGHT
  if (isCameraLayer(layer)) return AE_LAYER_TYPE.CAMERA
  if (layer.nullLayer) return AE_LAYER_TYPE.NULL
  if (isSolidSource((layer as AVLayer).source.mainSource)) return AE_LAYER_TYPE.SOLID
  if (isCompItem((layer as AVLayer).source)) return AE_LAYER_TYPE.COMP
  return AE_LAYER_TYPE.FOOTAGE
}
/** 获得链接图层的子图层 */
export function getLayerChildren(layer: Layer) {
  const children: Layer[] = []
  eachCompItemLayers(layer.containingComp, l => {
    if (l.index === layer.index || l.parent === null) return
    if (l.parent.index === layer.index) children.push(l)
  })
  return children
}
/** 获得图层的大小 */
export function getLayerSourceRect(
  layer: AVLayer,
  time?: number,
  includeExtents?: boolean,
  includeMasks?: boolean
) {
  if (isUndefined(includeExtents)) includeExtents = true
  if (isUndefined(includeMasks)) includeMasks = true
  if (isUndefined(time)) time = layer.containingComp.time
  let top = 0
  let left = 0
  let width = layer.width
  let height = layer.height
  if (isShapeLayer(layer) || isTextLayer(layer)) {
    const exp = [
      'thisLayer.sourceRectAtTime(' + time + ',',
      includeExtents ? 'true' : 'false',
      ').#;'
    ].join('')
    const effect = layer.effect.addProperty('ADBE Slider Control') as PropertyGroup
    const slider = effect(1) as Property
    slider.expression = exp.replace('#', 'top')
    top = slider.value
    slider.expression = exp.replace('#', 'left')
    left = slider.value
    slider.expression = exp.replace('#', 'width')
    width = slider.value
    slider.expression = exp.replace('#', 'height')
    height = slider.value
    effect.remove()
  }
  includeMasks &&
    layer.mask.numProperties > 0 &&
    eachPropertyGroup(layer.mask, p => {
      if (isShape(p.value)) {
        const maskBounds = getPathBounds(p.value, false)
        if (maskBounds[0] > top) top = maskBounds[0]
        if (maskBounds[1] > left) left = maskBounds[1]
        if (maskBounds[2] < width) width = maskBounds[2]
        if (maskBounds[3] < height) height = maskBounds[3]
      }
    })
  return [top, left, width, height]
}
/**
 * 检查一个图层是否为另一个图层的子图层
 * @param layer1
 * @param layer2
 * 如果 layer1 不是 layer2 的相对值，则为 0，
 * 如果 layer2 是 layer1 的后代，则为负数，如果 layer2 是上级，则为正数，
 * 如果两个图层不在同一合成中，或者它们是同一图层，则为 null。
 */
export function getLayerRelation(layer1: Layer, layer2: Layer) {
  const comp1 = layer1.containingComp
  const comp2 = layer2.containingComp
  if (comp1 !== comp2 || layer1.index === layer2.index) return null
  if (layer1.parent === null && layer2.parent === null) return 0
  let degree = 0
  let parent1 = layer1.parent
  let parent2 = layer2.parent
  while (parent1) {
    ++degree
    if (layer2.index === parent1.index) return degree
    parent1 = parent1.parent
  }
  degree = 0
  while (parent2) {
    ++degree
    if (layer1.index === parent2.index) return -degree
    parent2 = parent2.parent
  }
  return 0
}
/** 设置图层的父级 */
export function setLayerParent(l: Layer, parent: Layer) {
  if (isNull(l.parent)) l.parent = parent
}
/** 根据图层的不透明度设置图层的入点和出点 */
export function setLayerDurationByOption(layer: Layer, preExpression?: boolean) {
  if (isUndefined(preExpression)) preExpression = false
  const comp = layer.containingComp
  let inPoint = layer.inPoint
  let outPoint = layer.outPoint
  const inFrame = inPoint / comp.frameDuration
  const outFrame = outPoint / comp.frameDuration
  if (layer.transform.opacity.valueAtTime(inPoint, preExpression) === 0) {
    for (let i = inFrame; i < outFrame; i++) {
      const time = i * comp.frameDuration
      if (layer.transform.opacity.valueAtTime(time, preExpression) === 0)
        inPoint = time + comp.frameDuration
      else break
    }
  }
  if (layer.transform.opacity.valueAtTime(outPoint, preExpression) === 0) {
    for (let i = outFrame; i > inFrame; i--) {
      const time = i * comp.frameDuration
      if (layer.transform.opacity.valueAtTime(time, preExpression) === 0) outPoint = time
      else break
    }
  }
  if (inPoint !== layer.inPoint) layer.inPoint = inPoint
  if (outPoint !== layer.outPoint) layer.outPoint = outPoint
}
/**
 * 设置图层的新坐标。
 * @param layer 要移动的图层
 * @param position 新坐标
 * @param world 设置为 true 以使用世界坐标，默认值为 false。
 */
export function setLayerPosition(layer: Layer, position: TwoDPoint | ThreeDPoint, world?: boolean) {
  if (isUndefined(world)) world = false
  const p = layer.parent
  if (world) layer.parent = null
  layer.transform.position.setValue(position)
  if (world) layer.parent = p
}
/**
 * 设置图层的新坐标，以按偏移量平移图层。
 * @param layer 要移动的图层
 * @param offset 平移的值。二维或三维数组。
 * @param world 设置为 true 以在世界坐标中偏移，默认值为 false。
 */
export function layerTranslate(layer: Layer, offset: TwoDPoint | ThreeDPoint, world?: boolean) {
  const p = layer.transform.position.value
  p[0] += offset[0]
  p[1] += offset[1]
  if (offset.length === 3) {
    if (p.length === 2) p.push(offset[2])
    else p[2] += offset[2]
  }
  setLayerPosition(layer, p, world)
}
/** 通过id查找图层的效果 */
export function findLayerEffect(layer: AVLayer, id: string | number) {
  let length = layer.effect.numProperties
  while (length) {
    --length
    const effect = layer.effect.property(length) as PropertyGroup
    if (effect.name === id || effect.matchName === id || effect.propertyIndex === id) return effect
  }
}
/** 复制图层到合成中 */
export function copyLayersToComp(layers: Layer[], comp: CompItem, withPropertyLinks?: boolean) {
  if (isUndefined(withPropertyLinks) || APP_VERSION < 12) withPropertyLinks = false
  if (layers.length === 0) return
  const previousActiveComp = app.project.activeItem
  const originComp = layers[0].containingComp
  originComp.openInViewer()
  let i = -1
  eachCompItemLayers(originComp, l => {
    if (layers[++i] === l) l.selected = true
    else l.selected = false
  })
  withPropertyLinks ? executeCopyWithPropertyLinksCommand() : executeCopyCommand()
  comp.openInViewer()
  executePasteCommand()
  if (isCompItem(previousActiveComp)) previousActiveComp.openInViewer()
}
/** 判断图层是否有链接的子图层 */
export function layerHasChild(layer: Layer) {
  const comp = layer.containingComp
  const length = comp.layers.length
  for (let i = 0; i < length; ) {
    const l = comp.layer(i)
    if (l.index === layer.index || l.parent === null) continue
    if (l.parent.index === layer.index) return true
  }
  return false
}
/** 图层重命名 */
export function layerRename(layer: Layer, newName: string) {
  const oldName = layer.name
  layer.name = newName
  app.project.autoFixExpressions(oldName, newName)
}
/** 转化图层为JSON */
export function layerToJSON(layer: Layer) {
  const result = {
    type: getLayerType(layer),
    name: layer.name,
    index: layer.index,
    label: layer.label,
    inPoint: layer.inPoint,
    outPoint: layer.outPoint,
    startTime: layer.startTime
  }
  return result
}
