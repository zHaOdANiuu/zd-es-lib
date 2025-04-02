import { APP_VERSION, SHAPER_LAYER_CONTENTS_KEY } from './const'
import { activeCompItemEnviron } from './each'
import { addProperties, findProperty, setPropertiesValues } from './property'

const createCube = (() => {
  const positionData: ThreeDPoint[] = [
    [50, 50, -50],
    [100, 50, 0],
    [50, 50, 50],
    [0, 50, 0],
    [50, 0, 0],
    [50, 100, 0]
  ]
  const orientationsData: ThreeDPoint[] = [
    [0, 0, 0],
    [0, 270, 0],
    [0, 180, 0],
    [0, 90, 0],
    [270, 0, 0],
    [90, 0, 0]
  ]
  const colorData: ThreeDPoint[] = [
    [0.8, 0.8, 0.8],
    [0.3, 0.3, 0.3],
    [0.3, 0.3, 0.3],
    [0.7, 0.7, 0.7],
    [0.6, 0.6, 0.6],
    [0.7, 0.7, 0.7]
  ]
  return () => {
    if (APP_VERSION < 15) {
      alert(
        'Function <createCube> requires AE CC2018 or later, current version is less than target version, cube creation failed'
      )
      return
    }
    app.beginUndoGroup('Create Cube')
    const comp = app.project.items.addComp('<cube>1</cube>', 100, 100, 1, 20, 1)
    const shapeLayer = comp.layers.addShape()
    const VectorGroup = shapeLayer.Contents
    shapeLayer.threeDLayer = true
    shapeLayer.position.setValue(positionData[0])
    addProperties(
      VectorGroup,
      `${SHAPER_LAYER_CONTENTS_KEY.RECT}&&${SHAPER_LAYER_CONTENTS_KEY.FILL}`
    )
    const fillColor = findProperty(
      VectorGroup,
      `${SHAPER_LAYER_CONTENTS_KEY.FILL}/${SHAPER_LAYER_CONTENTS_KEY.FILL_COLOR}`
    ) as Property
    fillColor.setValue(colorData[0])
    fillColor.addToMotionGraphicsTemplate(comp)
    comp.setMotionGraphicsControllerName(1, 'Surface 1')
    let i = 0
    while (i < 5) {
      const thisLayer = comp.layer(comp.selectedLayers[0].index - (++i - 1)).duplicate()
      const thisFillColor = findProperty(
        thisLayer,
        `${SHAPER_LAYER_CONTENTS_KEY.CONTENTS}/${SHAPER_LAYER_CONTENTS_KEY.FILL}/${SHAPER_LAYER_CONTENTS_KEY.FILL_COLOR}`
      ) as Property
      setPropertiesValues(thisLayer, {
        position: positionData[i],
        orientation: orientationsData[i]
      })
      thisFillColor.setValue(colorData[i])
      thisFillColor.addToMotionGraphicsTemplate(comp)
      comp.setMotionGraphicsControllerName(i - (i - 1), 'Surface ' + (i + 1))
    }
    activeCompItemEnviron(c => c.layers.add(comp))
    app.endUndoGroup()
  }
})()

export default createCube
