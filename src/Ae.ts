import { isCompItem, isProperty, isPropertyGroup } from './base/const';

/** */
const getLayerByProperty = (p: Property) => p.propertyGroup(p.propertyDepth) as Layer;
/** */
const getCompItemByProperty = (p: Property) => getLayerByProperty(p).containingComp;
/** */
const getProperties = (items: Layer | PropertyGroup): _PropertyClasses[] =>
{
      let i = 0;
      const len = items.numProperties;
      const result: _PropertyClasses[] = [];
      while (i < len) result.push(items.property(++i));
      return result;
};
/** 对属性组的每个更改过的属性进行广度遍历操作 */
const eachPropertyGroup = (element: Layer | PropertyGroup, callback: (property: Property) => void) =>
{
      const stack = [ getProperties(element) ];
      for (;;)
      {
            const data = stack.pop();
            if (!data) break;
            let i = -1;
            const len = data.length;
            while (++i < len)
            {
                  const property = data[i];
                  isPropertyGroup(property)
                        ? stack.push(getProperties(property))
                        : property.isModified && property.canSetExpression && callback(property);
            }
      }
};
/** 对活动合成里的所有图层进行操作 */
const eachActiveCompItemLayers = (callback: (layer: Layer) => void) => activeCompItemEnviron(activeItem =>
{
      let i = -1;
      const layers = activeItem.layers;
      const length = layers.length;
      while (++i < length) callback(layers[i]);
});
/** 对活动合成里的所有图层属性进行操作 */
const eachActiveCompItemLayersProperties = (callback: (property: Property) => void) =>
{
      eachActiveCompItemLayers(layer => eachPropertyGroup(layer, property => callback(property)));
};
/** 对活动合成里的所有含有表达式的属性进行操作 */
const eachActiveCompItemLayersExpressionProperties = (callback: (property: Property) => void) =>
{
      eachActiveCompItemLayersProperties(property => property.expression !== '' && property.canSetExpression && callback(property));
};
/** 对合成里的所有图层进行操作 */
const eachCompItemLayers = (compItem: CompItem, callback: (layer: Layer) => void) =>
{
      let i = 0;
      const layers = compItem.layers;
      const length = layers.length;
      while (i < length) callback(layers[++i]);
};
/** 对项目里的所有合成进行操作 */
const eachCompItems = (callback: (compItem: CompItem) => void) =>
{
      let i = 0;
      const items = app.project.items;
      const length = items.length;
      while (i < length)
      {
            const item = items[++i];
            isCompItem(item) && callback(item);
      }
};
/** */
const eachProjectItem = (callback: (item: _ItemClasses) => void) =>
{
      let i = 0;
      const { length } = app.project.items;
      while (i < length) callback(app.project.items[++i]);
};
/** 对项目里的所有图层进行操作 */
const eachProjectLayers = (callback: (layer: Layer) => void) =>
{
      eachCompItems(compItem => eachCompItemLayers(compItem, layer => callback(layer)));
};
/** 对项目里的每个图层的每个属性进行操作 */
const eachProjectLayersProperties = (callback: (property: Property) => void) =>
{
      eachProjectLayers(layer => eachPropertyGroup(layer, property => callback(property)));
};
/** 对项目里每个有表达式的属性进行操作 */
const eachProjectLayersExpressionProperties = (callback: (property: Property) => void) =>
{
      eachProjectLayersProperties(property => property.expression !== '' && property.canSetExpression && callback(property));
};
/** 对选择的所有合成进行操作 */
const eachSelectedCompItems = (callback: (compItem: CompItem) => void) =>
{
      eachCompItems(compItem => compItem.selected && callback(compItem));
};
/** 对选择合成里的所有图层进行操作 */
const eachSelectedCompItemLayers = (callback: (layer: Layer) => void) =>
{
      eachSelectedCompItems(activeItem =>
      {
            let i = -1;
            const layers = activeItem.layers;
            const length = layers.length;
            while (++i < length) callback(layers[i]);
      });
};
/** 对选择合成里的所有图层属性属性进行操作 */
const eachSelectedCompItemLayersProperties = (callback: (property: Property) => void) =>
{
      eachSelectedCompItemLayers(layer => eachPropertyGroup(layer, property => callback(property)));
};
/** */
const eachSelectedCompItemLayersExpressionProperties = (callback: (property: Property) => void) =>
{
      eachSelectedCompItemLayersProperties(property => property.expression !== '' && property.canSetExpression && callback(property));
};
/** 遍历选活动合成选择的图层 */
const eachSelectedLayers = (callback: (layer: Layer) => void) =>
{
      activeCompItemEnviron(activeItem =>
      {
            const selectedLayers = activeItem.selectedLayers;
            const length = selectedLayers.length;
            if (activeItem.selectedLayers.length > 0)
            {
                  let index = -1;
                  while (++index < length) callback(selectedLayers[index]);
            }
      });
};
/** 对活动合成里的所有选中图层的所有属性进行操作 */
const eachSelectedLayersProperties = (callback: (property: Property) => void) =>
{
      eachSelectedLayers(layer => eachPropertyGroup(layer, property => callback(property)));
};
/** 对活动合成里的所有选中图层的所有有表达式的属性进行操作 */
const eachSelectedLayersExpressionProperties = (callback: (property: Property) => void) =>
{
      eachSelectedLayersProperties(property => property.expression !== '' && property.canSetExpression && callback(property));
};
/** 对活动合成选中的属性进行遍历 */
const eachSelectedProperties = (callback: (property: Property) => void) =>
{
      activeCompItemEnviron(compItem =>
      {
            const selectedProperties = compItem.selectedProperties;
            const length = selectedProperties.length;
            if (length < 1) return;
            let i = -1;
            while (++i < length)
            {
                  const property = selectedProperties[i];
                  isProperty(property) && property.canSetExpression && callback(property);
            }
      });
};
/** */
const eachSelectedKeyframe = (callback: (property: Property, selectedKeyframeID: number) => void) =>
{
      eachSelectedProperties(property =>
      {
            const { selectedKeys } = property;
            if (selectedKeys.length < 0) return;
            let i = 0;
            const { length } = selectedKeys;
            while (i < length) { callback(property, selectedKeys[i]); ++i; }
      });
};
/** 通过名字查找活动合成*/
const findCompItem = (name: string): CompItem[] | null =>
{
      const result: CompItem[] = [];
      eachCompItems(item => item.name === name && result.push(item));
      return result.length < 1 ? null : result;
};
/** 对活动合成进行操作 */
const activeCompItemEnviron = (callback: (compItem: CompItem) => void) =>
{
      const activeItem = app.project.activeItem;
      isCompItem(activeItem) && callback(activeItem);
};

export {
      getLayerByProperty,
      getCompItemByProperty,
      getProperties,
      eachPropertyGroup,
      eachActiveCompItemLayers,
      eachActiveCompItemLayersProperties,
      eachActiveCompItemLayersExpressionProperties,
      eachCompItemLayers,
      eachCompItems,
      eachProjectItem,
      eachProjectLayers,
      eachProjectLayersProperties,
      eachProjectLayersExpressionProperties,
      eachSelectedCompItems,
      eachSelectedCompItemLayers,
      eachSelectedCompItemLayersProperties,
      eachSelectedCompItemLayersExpressionProperties,
      eachSelectedLayers,
      eachSelectedLayersProperties,
      eachSelectedLayersExpressionProperties,
      eachSelectedProperties,
      eachSelectedKeyframe,
      findCompItem,
      activeCompItemEnviron
};
