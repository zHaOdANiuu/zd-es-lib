import { SHAPER_LAYER_CONTENTS_KEY, APP_VERSION } from './const'
import { activeCompItemEnviron } from './each'
import degreesToRadians from './math/degreesToRadians'
import dihedralAngle from './math/dihedralAngle'
import { addProperties, setPropertiesValues, setPropertyValue, findProperty } from './property'
import { phi } from './util/const'

const createDodecahedron = (() => {
  const FIND_FILL_COLOR_PATH = `${SHAPER_LAYER_CONTENTS_KEY.FILL}/${SHAPER_LAYER_CONTENTS_KEY.FILL_COLOR}`
  const orientationsData: ThreeDPoint[] = [
    [90, 0, 36],
    [0, 0, 0],
    [0, 72, 0],
    [0, 144, 0],
    [0, 216, 0],
    [0, 288, 0],
    [90, 0, 36],
    [0, 0, 0],
    [0, 72, 0],
    [0, 144, 0],
    [0, 216, 0],
    [0, 288, 0]
  ]
  const colorData: ThreeDPoint[] = [
    [0.8, 0.8, 0.8],
    [0.4, 0.4, 0.4],
    [0.7, 0.7, 0.7],
    [0.9, 0.9, 0.9],
    [0.7, 0.7, 0.7],
    [0.6, 0.6, 0.6],
    [0.6, 0.6, 0.6],
    [0.7, 0.7, 0.7],
    [0.5, 0.5, 0.5],
    [0.3, 0.3, 0.3],
    [0.4, 0.4, 0.4],
    [0.9, 0.9, 0.9]
  ]
  return () => {
    if (APP_VERSION < 15) {
      alert(
        'Function <createDodecahedron> requires AE CC2018 or later, the current version is less than the target version, the creation of the cube failed'
      )
      return
    }
    app.beginUndoGroup('Create Dodecahedron')
    const newComp = app.project.items.addComp('<dodecahedron>1</dodecahedron>', 480, 270, 1, 20, 1)
    const shapeLayer = newComp.layers.addShape()
    const VectorGroup = shapeLayer.Contents
    shapeLayer.threeDLayer = true
    addProperties(
      VectorGroup,
      `${SHAPER_LAYER_CONTENTS_KEY.STAR}&&${SHAPER_LAYER_CONTENTS_KEY.FILL}`
    )
    setPropertiesValues(shapeLayer, {
      orientation: orientationsData[0],
      xRotation: dihedralAngle(5, 3) - 90,
      anchorPoint: [
        0,
        0,
        ((phi * phi) / (2 * Math.sqrt(3 - phi))) * Math.sin(degreesToRadians(36)) * 200
      ]
    })
    setPropertyValue(
      VectorGroup,
      `${SHAPER_LAYER_CONTENTS_KEY.STAR}/${SHAPER_LAYER_CONTENTS_KEY.STAR_TYPE}`,
      2
    )
    const fillColor = findProperty(VectorGroup, FIND_FILL_COLOR_PATH) as Property
    fillColor.setValue(colorData[0])
    fillColor.addToMotionGraphicsTemplate(newComp)
    newComp.setMotionGraphicsControllerName(1, 'Surface 1')
    let i = 0
    while (i < 11) {
      const thisLayer = newComp.layer(newComp.selectedLayers[0].index - (++i - 1)).duplicate()
      const thisFillColor = findProperty(
        thisLayer,
        `${SHAPER_LAYER_CONTENTS_KEY.CONTENTS}/${FIND_FILL_COLOR_PATH}`
      ) as Property
      thisLayer.orientation.setValue(orientationsData[i])
      thisFillColor.setValue(colorData[i])
      thisFillColor.addToMotionGraphicsTemplate(newComp)
      newComp.setMotionGraphicsControllerName(i - (i - 1), 'Surface ' + (i + 1))
      if (i > 5) thisLayer.scale.setValue([-100, -100, -100])
    }
    newComp.selectedLayers[0].xRotation.setValue(0)
    newComp.layer(6).xRotation.setValue(0)
    activeCompItemEnviron(c => c.layers.add(newComp))
    app.endUndoGroup()
  }
})()

export default createDodecahedron
