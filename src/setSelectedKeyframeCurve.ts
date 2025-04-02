import { eachSelectedKeyframe } from './each'
import { temporalEaseToKeyframeEase } from './keyframe'
import { isArray } from './util/is'
import clamp from './util/clamp'
import duffMap from './util/duffMap'

const calcInfluence = (influence: number) => clamp(influence * 100, 0.1, 100)

const easeIn = (
  val: number,
  property: Property,
  keyID: number,
  influence: number,
  defaultSpeed: number
) =>
  new KeyframeEase(
    keyID > 1 ? calcSpeed(property, keyID - 1, keyID, val, influence) : defaultSpeed,
    influence
  )

const easeOut =
  () => (val: number, property: Property, keyID: number, influence: number, defaultSpeed: number) =>
    new KeyframeEase(
      keyID <= property.selectedKeys.length
        ? calcSpeed(property, keyID, keyID + 1, val, influence)
        : defaultSpeed,
      influence
    )

function calcSpeed(
  property: Property,
  keyID1: number,
  keyID2: number,
  curveValue: number,
  influence: number
) {
  let speed = 0
  switch (property.propertyValueType) {
    case PropertyValueType.SHAPE:
    case PropertyValueType.NO_VALUE:
    case PropertyValueType.CUSTOM_VALUE:
      return speed
    case PropertyValueType.COLOR:
      speed *= 255
      break
    default:
      {
        const keyValue1 = property.keyValue(keyID1)
        const keyValue2 = property.keyValue(keyID2)
        const keyTime1 = property.keyTime(keyID1)
        const keyTime2 = property.keyTime(keyID2)
        const time = keyTime2 - keyTime1
        let value: number
        if (isArray(keyValue1)) value = keyValue2[0] - keyValue1[0]
        else value = keyValue2 - keyValue1
        speed = value / time
      }
      break
  }
  return (speed * curveValue * 100) / influence
}
function calcEase(
  curveValue: number[],
  arr: KeyframeEase[],
  type: 1 | 2,
  property: Property,
  keyID: number
) {
  const temp: any = type === 1 ? [easeIn, 3, 2] : [easeOut, 1, 0]
  return duffMap(arr, v => {
    return temp[0](curveValue[1], property, keyID, calcInfluence(curveValue[temp[2]]), v.speed)
  })
}
function setSelectedKeyframeCurve(curveValue: [number, number, number, number]) {
  let left: 1 | 2 = 2
  eachSelectedKeyframe((property, keyID) => {
    const keyInTemporalEase = property.keyInTemporalEase(keyID)
    const keyOutTemporalEase = property.keyOutTemporalEase(keyID)
    if (left === 1) {
      property.setTemporalEaseAtKey(
        keyID,
        calcEase(curveValue, keyInTemporalEase, left, property, keyID) as any,
        temporalEaseToKeyframeEase(keyOutTemporalEase)
      )
      left = 2
    } else {
      property.setTemporalEaseAtKey(
        keyID,
        temporalEaseToKeyframeEase(keyInTemporalEase),
        calcEase(curveValue, keyOutTemporalEase, left, property, keyID) as any
      )
      left = 1
    }
  })
}

export default setSelectedKeyframeCurve
