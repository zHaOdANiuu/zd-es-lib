import { BUILT_PARAMS, PROPERTY_INTERPOLATION_TYPE } from './const'

export const isFootageItem = (o: any): o is FootageItem => o instanceof FootageItem

export const isCompItem = (o: any): o is CompItem => o instanceof CompItem

export const isAVLayer = (o: any): o is AVLayer => o instanceof AVLayer

export const isShapeLayer = (o: any): o is ShapeLayer => o instanceof ShapeLayer

export const isTextLayer = (o: any): o is TextLayer => o instanceof TextLayer

export const isCameraLayer = (o: any): o is CameraLayer => o instanceof CameraLayer

export const isLightLayer = (o: any): o is LightLayer => o instanceof LightLayer

export const isSolidSource = (o: any): o is SolidSource => o instanceof SolidSource

export const isPreComposition = (o: any): o is CompItem => isCompItem(o.source)

export const isThreeDLayer = (layer: Layer) =>
  (isAVLayer(layer) && layer.threeDLayer) || isCameraLayer(layer) || isLightLayer(layer)

export const isShape = (o: any): o is Shape => o instanceof Shape

export const isProperty = (o: any): o is Property => o instanceof Property

export const isColorProperty = (property: any): property is ColorProperty =>
  isProperty(property) && property.propertyValueType === PropertyValueType.COLOR

export const isCustomValueProperty = (property: Property) =>
  property.propertyValueType === PropertyValueType.CUSTOM_VALUE

export const isPropertyGroup = (o: any): o is PropertyGroup =>
  o instanceof PropertyGroup || o instanceof MaskPropertyGroup

export const isBuiltParamsPropertyGroup = (p: PropertyGroup) => p.matchName === BUILT_PARAMS

export function getValidInterpolationTypes(property: Property) {
  const r = []
  property.isInterpolationTypeValid(PROPERTY_INTERPOLATION_TYPE[0]) &&
    r.push(PROPERTY_INTERPOLATION_TYPE[0]) &&
    property.isInterpolationTypeValid(PROPERTY_INTERPOLATION_TYPE[1]) &&
    r.push(PROPERTY_INTERPOLATION_TYPE[1]) &&
    property.isInterpolationTypeValid(PROPERTY_INTERPOLATION_TYPE[2]) &&
    r.push(PROPERTY_INTERPOLATION_TYPE[2])
  return r
}

export function isHoldInterpolationTypeOnly(property: Property) {
  const validInterpolationTypes = getValidInterpolationTypes(property)
  return (
    validInterpolationTypes.length === 1 &&
    validInterpolationTypes[0] === KeyframeInterpolationType.HOLD
  )
}

export function isTwoDOrThreeDProperty(property: Property) {
  if (
    property.propertyValueType === PropertyValueType.TwoD_SPATIAL ||
    property.propertyValueType === PropertyValueType.TwoD
  )
    return '2D'
  else if (
    property.propertyValueType === PropertyValueType.ThreeD_SPATIAL ||
    property.propertyValueType === PropertyValueType.ThreeD
  )
    return '3D'
  return 'unknown'
}
