import { HAS_KEY_LABEL } from './const'
import { isHoldInterpolationTypeOnly, isColorProperty, isCustomValueProperty } from './is'
import duffEach from './util/duffEach'
import duffMap from './util/duffMap'
import { isNil, isUndefined } from './util/is'

/** */
export const canSetKeyframeVelocity = (property: Property) => !isHoldInterpolationTypeOnly(property)
/** */
export const temporalEaseToKeyframeEase = (KeyframeEaseArr: KeyframeEase[]) =>
  duffMap(KeyframeEaseArr, v => new KeyframeEase(v.speed, v.influence || 0.1)) as [KeyframeEase]
/** */
export function setKeyframeValues(property: Property, keyframeValues: Keyframe[]): void {
  if (keyframeValues.length === 0) return
  const isSpatialValue = property.isSpatial && !isColorProperty(property)
  const canSetVelocity = canSetKeyframeVelocity(property)
  duffEach(keyframeValues, keyframe => {
    const keyTime = keyframe.keyTime
    const keyValue = keyframe.keyValue
    const keyIndex = property.nearestKeyIndex(keyframe.keyTime)
    const keyInSpatialTangent = keyframe.keyInSpatialTangent
    const keyOutSpatialTangent = keyframe.keyOutSpatialTangent
    const keySpatialAutoBezier = keyframe.keySpatialAutoBezier
    const keySpatialContinuous = keyframe.keySpatialContinuous
    const keyInTemporalEase = keyframe.keyInTemporalEase
    const keyOutTemporalEase = keyframe.keyOutTemporalEase
    const keyTemporalContinuous = keyframe.keyTemporalContinuous
    const keyTemporalAutoBezier = keyframe.keyTemporalAutoBezier
    const keyInInterpolationType = keyframe.keyInInterpolationType
    const keyOutInterpolationType = keyframe.keyOutInterpolationType
    const keyRoving = keyframe.keyRoving
    const keyLabel = keyframe.keyLabel
    const keySelected = keyframe.keySelected
    property.setValueAtTime(keyTime, keyValue)
    if (isSpatialValue) {
      !isNil(keyInSpatialTangent) &&
        property.setSpatialTangentsAtKey(
          keyIndex,
          keyInSpatialTangent as ThreeDPoint,
          keyOutSpatialTangent as ThreeDPoint
        )
      !isNil(keySpatialAutoBezier) &&
        property.setSpatialAutoBezierAtKey(keyIndex, keySpatialAutoBezier)
      !isNil(keySpatialContinuous) &&
        property.setSpatialContinuousAtKey(keyIndex, keySpatialContinuous)
      !isNil(keyRoving) && property.setRovingAtKey(keyIndex, keyRoving)
    }
    if (canSetVelocity)
      !isNil(keyInTemporalEase) &&
        property.setTemporalEaseAtKey(
          keyIndex,
          temporalEaseToKeyframeEase(keyInTemporalEase),
          !isNil(keyOutTemporalEase) ? temporalEaseToKeyframeEase(keyOutTemporalEase) : void 0
        )
    !isNil(keyTemporalContinuous) &&
      property.setTemporalContinuousAtKey(keyIndex, keyTemporalContinuous)
    !isNil(keyTemporalAutoBezier) &&
      property.setTemporalAutoBezierAtKey(keyIndex, keyTemporalAutoBezier)
    !isNil(keyInInterpolationType) &&
      property.setInterpolationTypeAtKey(
        keyIndex,
        keyInInterpolationType,
        !isNil(keyOutInterpolationType) ? keyOutInterpolationType : void 0
      )
    HAS_KEY_LABEL && !isNil(keyLabel) && property.setLabelAtKey(keyIndex, keyLabel)
    !isNil(keySelected) && property.setSelectedAtKey(keyIndex, keySelected)
  })
}
/**
 * 获得指定索引的Keyframe对象
 * @returns !!!没有property属性的Keyframe对象
 */
export function getKeyframeValueByIndex(
  property: Property,
  keyIndex: number,
  hasSpatialValue: boolean,
  isCustomValue: boolean
): Keyframe {
  return {
    keyTime: property.keyTime(keyIndex),
    keyValue: isCustomValue ? null : property.keyValue(keyIndex),
    keySelected: property.keySelected(keyIndex),
    keyInTemporalEase: property.keyInTemporalEase(keyIndex),
    keyOutTemporalEase: property.keyOutTemporalEase(keyIndex),
    keyTemporalContinuous: property.keyTemporalContinuous(keyIndex),
    keyTemporalAutoBezier: property.keyTemporalAutoBezier(keyIndex),
    keyInInterpolationType: property.keyInInterpolationType(keyIndex),
    keyOutInterpolationType: property.keyOutInterpolationType(keyIndex),
    keyInSpatialTangent: hasSpatialValue ? property.keyInSpatialTangent(keyIndex) : null,
    keyOutSpatialTangent: hasSpatialValue ? property.keyOutSpatialTangent(keyIndex) : null,
    keySpatialAutoBezier: hasSpatialValue ? property.keySpatialAutoBezier(keyIndex) : null,
    keySpatialContinuous: hasSpatialValue ? property.keySpatialContinuous(keyIndex) : null,
    keyRoving: hasSpatialValue ? property.keyRoving(keyIndex) : null,
    keyLabel: HAS_KEY_LABEL ? property.keyLabel(keyIndex) : null
  } as Keyframe
}
/** */
export function getKeyframeValues(
  property: Property,
  predicate?: (prop: Property, keyIndex: number) => boolean
) {
  if (isUndefined(predicate)) predicate = () => true
  const isSpatialValue = property.isSpatial
  const isCustomValue = isCustomValueProperty(property)
  const len = property.numKeys
  const r: Keyframe[] = []
  for (let i = 0; i < len; ++i) {
    const keyIndex = i + 1
    if (predicate(property, keyIndex))
      r.push(getKeyframeValueByIndex(property, keyIndex, isSpatialValue, isCustomValue))
  }
  return r
}
/** 删除关键帧 */
export function removeKeyFrames(property: Property, keyframes: Keyframe[]) {
  duffEach(keyframes, keyframe => {
    const keyIndex = property.nearestKeyIndex(keyframe.keyTime)
    property.removeKey(keyIndex)
  })
}
/** 把关键帧的时间标准化为指定帧率的整数时间 */
export function normalizeKeyframeTime(property: Property, frameRate: number) {
  const keyValues = getKeyframeValues(property)
  removeKeyFrames(property, keyValues)
  setKeyframeValues(
    property,
    duffMap(keyValues, keyframe => {
      keyframe.keyTime = Math.round(keyframe.keyTime * frameRate) / frameRate
      return keyframe
    })
  )
}
