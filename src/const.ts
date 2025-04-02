export const BUILT_PARAMS = 'ADBE Effect Built In Params'

export const APP_VERSION = parseFloat(app.version)

export const HAS_KEY_LABEL = APP_VERSION > 22.5
/** [ 6612: KeyframeInterpolationType.LINEAR , 6613: KeyframeInterpolationType.BEZIER, 6614:KeyframeInterpolationType.HOLD ] */
export const PROPERTY_INTERPOLATION_TYPE = [ 6612, 6613, 6614 ] as const

export const SPATIAL_PROPERTY_VALUE_TYPE = [ PropertyValueType.ThreeD_SPATIAL, PropertyValueType.TwoD_SPATIAL ]

export const AE_LAYER_TYPE = {
      TEXT:       0,
      SHAPE:      1,
      SOLID:      2,
      NULL:       3,
      ADJUSTMENT: 4,
      LIGHT:      5,
      CAMERA:     6,
      COMP:       7,
      FOOTAGE:    8
}

export const AE_MENU_COMMAND_ID = {
      CREATE_TEXT:                2836,
      CREATE_SOLID:               2038,
      CREATE_LIGHT:               2563,
      CREATE_CAMERA:              2564,
      CREATE_NULL:                2767,
      CREATE_SHAPE:               3736,
      CREATE_ADJUSTMENT_LAYER:    2279,
      SAVE_ANIMATION_Preset:      3075,
      CUT:                        18,
      COPY:                       19,
      COPY_WITH_PROPERTY_LINKS:   10310,
      PASTE:                      20,
      DUPLICATE:                  2080,
      UNDO:                       16,
      GENERAL_PREFERENCES:        2359,
      SCRIPTING_PREFERENCES:      3131,
      LAYER_CONTROLS:             2435,
      REVEAL_EXPRESSION_ERRORS:   2731,
      CONVERT_AUDIO_TO_KEYFRAMES: 4218
}

export const LAYER_DEFAULT_PROPERTIES = {
      isTrackMatte:           false,
      canSetTimeRemapEnabled: false,
      audioActive:            false,
      audioEnabled:           true,
      motionBlur:             false,
      adjustmentLayer:        false,
      environmentLayer:       false,
      guideLayer:             false,
      threeDLayer:            false,
      threeDPerChar:          false,
      collapseTransformation: false,
      timeRemapEnabled:       false,
      preserveTransparency:   false,
      effectsActive:          true,
      frameBlendingType:      4012,
      blendingMode:           5212,
      samplingQuality:        4812,
      quality:                4614
}

export const COMP_ITEM_DEFAULT_PROPERTIES = {
      hideShyLayers:                 false,
      motionBlur:                    false,
      draft3d:                       false,
      frameBlending:                 false,
      preserveNestedFrameRate:       false,
      preserveNestedResolution:      false,
      dropFrame:                     true,
      displayStartTime:              0,
      displayStartFrame:             0,
      shutterAngle:                  180,
      shutterPhase:                  -90,
      motionBlurSamplesPerFrame:     16,
      motionBlurAdaptiveSampleLimit: 128,
      renderer:                      'ADBE Advanced 3d'
}

const ADBE_VECTOR_STR = 'ADBE Vector '
const SHAPE_STR = ADBE_VECTOR_STR + 'Shape - '
const GRAPHIC_STR = ADBE_VECTOR_STR + 'Graphic - '
const FILTER_STR = ADBE_VECTOR_STR + 'Filter - '
export const SHAPER_LAYER_CONTENTS_KEY = {
      CONTENTS:     'ADBE Root Vectors Group',
      GROUP:        ADBE_VECTOR_STR + 'Group',
      RECT:         SHAPE_STR + 'Rect',
      ELLIPSE:      SHAPE_STR + 'Ellipse',
      STAR:         SHAPE_STR + 'Star',
      STAR_TYPE:    SHAPE_STR + 'Star Type',
      SHAPE:        SHAPE_STR + 'Group',
      FILL:         GRAPHIC_STR + 'Fill',
      FILL_COLOR:   ADBE_VECTOR_STR + 'Fill Color',
      STROKE:       GRAPHIC_STR + 'Stroke',
      STROKE_COLOR: ADBE_VECTOR_STR + 'Stroke Color',
      G_Fill:       GRAPHIC_STR + 'G-Fill',
      G_Stroke:     GRAPHIC_STR + 'G-Stroke',
      MERGE:        FILTER_STR + 'Merge',
      OFFSET:       FILTER_STR + 'Offset',
      /** PuckerBloat */
      PB:           FILTER_STR + 'PB',
      REPEATER:     FILTER_STR + 'Repeater',
      /** 圆角 */
      RC:           FILTER_STR + 'RC',
      TRIM:         FILTER_STR + 'Trim',
      TWIST:        FILTER_STR + 'Twist',
      WIGGLE_PATH:  FILTER_STR + 'Roughen',
      WIGGLER:      FILTER_STR + 'Wiggler',
      ZIGZAG:       FILTER_STR + 'ZigZag'
}
