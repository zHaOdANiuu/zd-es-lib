import { isCameraLayer, isCompItem, isLightLayer, isShapeLayer, isSolidSource, isTextLayer } from './base/const';

function getLayerType(layer: Layer): LayerType
{
      if (isShapeLayer(layer)) return 'Shape';
      if (isTextLayer(layer)) return 'Text';
      if (isCameraLayer(layer)) return 'Camera';
      if (isLightLayer(layer)) return 'Light';
      if (layer.nullLayer) return 'Null';
      if (isSolidSource((layer as AVLayer).source.mainSource)) return 'Solid';
      if (isCompItem((layer as AVLayer).source)) return 'Comp';
      return 'File';
}

export default getLayerType;
