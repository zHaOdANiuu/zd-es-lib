/// <reference types="./env.d.ts" />
export {
      executeCutCommand,
      executeCopyCommand,
      executeCopyWithPropertyLinksCommand,
      executePasteCommand,
      executeDuplicateCommand,
      executeUndoCommand,
      executeSaveAnimationPresetCommand,
      executeAudioToKeyframesCommand
} from './src/command'
export {
      BUILT_PARAMS,
      APP_VERSION,
      HAS_KEY_LABEL,
      PROPERTY_INTERPOLATION_TYPE,
      SPATIAL_PROPERTY_VALUE_TYPE,
      AE_LAYER_TYPE,
      AE_MENU_COMMAND_ID,
      LAYER_DEFAULT_PROPERTIES,
      COMP_ITEM_DEFAULT_PROPERTIES,
      SHAPER_LAYER_CONTENTS_KEY
} from './src/const'
export {
      eachPropertyGroup,
      activeCompItemEnviron,
      eachProjectItem,
      eachProjectLayers,
      eachProjectLayersProperties,
      eachProjectLayersExpressionProperties,
      eachCompItems,
      eachCompItemLayers,
      eachActiveCompItemLayers,
      eachActiveCompItemLayersProperties,
      eachActiveCompItemLayersExpressionProperties,
      eachSelectedCompItems,
      eachSelectedCompItemLayers,
      eachSelectedCompItemLayersProperties,
      eachSelectedCompItemLayersExpressionProperties,
      eachSelectedLayers,
      eachSelectedLayersProperties,
      eachSelectedLayersExpressionProperties,
      eachSelectedProperties,
      eachSelectedKeyframe
} from './src/each'
export {
      writeAeExpression,
      clearAeExpression
} from './src/expression'
export {
      isFootageItem,
      isCompItem,
      isAVLayer,
      isShapeLayer,
      isTextLayer,
      isCameraLayer,
      isLightLayer,
      isSolidSource,
      isPreComposition,
      isThreeDLayer,
      isShape,
      isProperty,
      isColorProperty,
      isCustomValueProperty,
      isPropertyGroup,
      isBuiltParamsPropertyGroup,
      getValidInterpolationTypes,
      isHoldInterpolationTypeOnly,
      isTwoDOrThreeDProperty
} from './src/is'
export {
      layersParentAllOrphans,
      findCompItem,
      cropCompItem,
      reCropCompItem,
      reSetCompItemDuration,
      reSetCompItemSize
} from './src/item'
export {
      canSetKeyframeVelocity,
      temporalEaseToKeyframeEase,
      setKeyframeValues,
      getKeyframeValueByIndex,
      getKeyframeValues,
      removeKeyFrames,
      normalizeKeyframeTime
} from './src/keyframe'
export {
      addTextLayer,
      addShapeLayer,
      addSolidLayer,
      addNullLayer,
      addAdjustmentLayer,
      addCameraLayer,
      addLightLayer,
      alignLayerPosition,
      alignLayerOrientation,
      alignLayerScale,
      alignLayerOpacity,
      alignLayer,
      getLayerType,
      getLayerChildren,
      getLayerSourceRect,
      getLayerRelation,
      setLayerParent,
      setLayerDurationByOption,
      setLayerPosition,
      layerTranslate,
      findLayerEffect,
      copyLayersToComp,
      layerHasChild,
      layerRename,
      layerToJSON
} from './src/layer'
export {
      addMask,
      addProperties,
      findProperty,
      setPropertyValue,
      setPropertiesValues,
      getLayerByProperty,
      getCompItemByProperty,
      getProperties,
      getPathBounds
} from './src/property'
export {
      isFile,
      isFolder
} from './src/os/is'
export {
      isPanel,
      isGroup,
      isWindow,
      isTreeView,
      isStaticText,
      isEditText,
      isButton,
      isCheckbox,
      isSlider,
      isCustom,
      isImage,
      isListItem,
      isTreeViewNode
} from './src/ui/is'
export {
      NORMALIZE,
      MAX_HUE,
      HUE_FACTOR,
      PERCENTAGE_FACTOR,
      rgb,
      hsb,
      hex2Rgb,
      rgb2Hsb,
      hsb2Rgb
} from './src/util/color'
export {
      phi,
      isMac,
      ArrayPrototype,
      ObjectPrototype,
      nativeSlice,
      nativeShift,
      nativeSplice,
      nativeJoin,
      SUPPORT_FILES,
      MIN_AEPX,
      MIN_IMAGE
} from './src/util/const'
export {
      isNull,
      isNil,
      isUndefined,
      isBoolean,
      isNumber,
      isString,
      isFunction,
      isArray
} from './src/util/is'
export { default as changeAeLanguage
 } from './src/changeAeLanguage'
export { default as createCube
 } from './src/createCube'
export { default as createDodecahedron
 } from './src/createDodecahedron'
export { default as duplicateLayer
 } from './src/duplicateLayer'
export { default as eval2
 } from './src/eval2'
export { default as importXMP
 } from './src/importXMP'
export { default as isReadonly
 } from './src/isReadonly'
export { default as isReadwrite
 } from './src/isReadwrite'
export { default as notifyApp
 } from './src/notifyApp'
export { default as openImageInPhotoshop
 } from './src/openImageInPhotoshop'
export { default as PseudoEffect
 } from './src/PseudoEffect'
export { default as saveFrameSequenceToPNGSequence
 } from './src/saveFrameSequenceToPNGSequence'
export { default as saveFrameToPng
 } from './src/saveFrameToPng'
export { default as saveThumbnail
 } from './src/saveThumbnail'
export { default as setSelectedKeyframeCurve
 } from './src/setSelectedKeyframeCurve'
export { default as tempComp
 } from './src/tempComp'
export { default as toSource2
 } from './src/toSource2'
export { default as unwatch2
 } from './src/unwatch2'
export { default as watch2
 } from './src/watch2'
export { default as copyToClipboard
 } from './src/cmd/copyToClipboard'
export { default as curl
 } from './src/cmd/curl'
export { default as getPcMac
 } from './src/cmd/getPcMac'
export { default as openFileLocation
 } from './src/cmd/openFileLocation'
export { default as systemQuit
 } from './src/cmd/systemQuit'
export { default as enterEvent
 } from './src/event/enterEvent'
export { default as mouseHover
 } from './src/event/mouseHover'
export { default as mouseMoveElement
 } from './src/event/mouseMoveElement'
export { default as mouseRightClickDrag
 } from './src/event/mouseRightClickDrag'
export { default as onAltClick
 } from './src/event/onAltClick'
export { default as onCtrlClick
 } from './src/event/onCtrlClick'
export { default as rightClickMenu
 } from './src/event/rightClickMenu'
export { default as convexHull
 } from './src/math/convexHull'
export { default as cubicBezier
 } from './src/math/cubicBezier'
export { default as degreesToRadians
 } from './src/math/degreesToRadians'
export { default as dihedralAngle
 } from './src/math/dihedralAngle'
export { default as getBounds
 } from './src/math/getBounds'
export { default as linear
 } from './src/math/linear'
export { default as radiansToDegrees
 } from './src/math/radiansToDegrees'
export { default as copyFile
 } from './src/os/copyFile'
export { default as moveFile
 } from './src/os/moveFile'
export { default as readAEPrefLabelData
 } from './src/os/readAEPrefLabelData'
export { default as readFile
 } from './src/os/readFile'
export { default as renameFile
 } from './src/os/renameFile'
export { default as writeFile
 } from './src/os/writeFile'
export { default as addElementDown
 } from './src/ui/addElementDown'
export { default as addElementToLeftAndRight
 } from './src/ui/addElementToLeftAndRight'
export { default as changColorOfPNG
 } from './src/ui/changColorOfPNG'
export { default as Graphics
 } from './src/ui/Graphics'
export { default as layout
 } from './src/ui/layout'
export { default as searchList
 } from './src/ui/searchList'
export { default as treeViewAddFolder
 } from './src/ui/treeViewAddFolder'
export { default as TreeViewExtends
 } from './src/ui/TreeViewExtends'
export { default as windowAutoResize
 } from './src/ui/windowAutoResize'
export { default as breadthTraversesFolders
 } from './src/util/breadthTraversesFolders'
export { default as clamp
 } from './src/util/clamp'
export { default as debounce
 } from './src/util/debounce'
export { default as deeplyTraverseFolder
 } from './src/util/deeplyTraverseFolder'
export { default as duffEach
 } from './src/util/duffEach'
export { default as duffMap
 } from './src/util/duffMap'
export { default as forOwn
 } from './src/util/forOwn'
export { default as framesToTime
 } from './src/util/framesToTime'
export { default as has
 } from './src/util/has'
export { default as hexToDec
 } from './src/util/hexToDec'
export { default as hexToString
 } from './src/util/hexToString'
export { default as intToString
 } from './src/util/intToString'
export { default as loop
 } from './src/util/loop'
export { default as modify
 } from './src/util/modify'
export { default as objectPath
 } from './src/util/objectPath'
export { default as random
 } from './src/util/random'
export { default as randomString
 } from './src/util/randomString'
export { default as reversedString
 } from './src/util/reversedString'
export { default as stringToHex
 } from './src/util/stringToHex'
export { default as stringToInt8
 } from './src/util/stringToInt8'
export { default as stringToInt32
 } from './src/util/stringToTnt'
export { default as timeToFrames
 } from './src/util/timeToFrames'
export { default as traverseHierarchy
 } from './src/util/traverseHierarchy'
