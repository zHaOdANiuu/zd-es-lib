import { isCompItem, isProperty, isPropertyGroup } from './base/const';

/** */
function getLayerByProperty(p: Property) { return p.propertyGroup(p.propertyDepth) as Layer; }
/** */
function getCompItemByProperty(p: Property) { return getLayerByProperty(p).containingComp; }
/** */
function getProperties(items: Layer | PropertyGroup): _PropertyClasses[]
{
      let i = 0;
      const len = items.numProperties;
      const result: _PropertyClasses[] = [];
      while (i < len) result.push(items.property(++i));
      return result;
}
/** 对属性组的每个更改过的属性进行广度遍历操作 */
function eachPropertyGroup(element: Layer | PropertyGroup, callback: (property: Property) => void)
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
}
/** 对活动合成里的所有图层进行操作 */
function eachActiveCompItemLayers(callback: (layer: Layer) => void)
{
      return activeCompItemEnviron(activeItem =>
      {
            let i = -1;
            const layers = activeItem.layers;
            const length = layers.length;
            while (++i < length) callback(layers[i]);
      });
}
/** 对活动合成里的所有图层属性进行操作 */
function eachActiveCompItemLayersProperties(callback: (property: Property) => void)
{
      eachActiveCompItemLayers(layer => eachPropertyGroup(layer, property => callback(property)));
}
/** 对活动合成里的所有含有表达式的属性进行操作 */
function eachActiveCompItemLayersExpressionProperties(callback: (property: Property) => void)
{
      eachActiveCompItemLayersProperties(property => property.expression !== '' && property.canSetExpression && callback(property));
}
/** 对合成里的所有图层进行操作 */
function eachCompItemLayers(compItem: CompItem, callback: (layer: Layer) => void)
{
      let i = 0;
      const layers = compItem.layers;
      const length = layers.length;
      while (i < length) callback(layers[++i]);
}
/** 对项目里的所有合成进行操作 */
function eachCompItems(callback: (compItem: CompItem) => void)
{
      let i = 0;
      const items = app.project.items;
      const length = items.length;
      while (i < length)
      {
            const item = items[++i];
            isCompItem(item) && callback(item);
      }
}
/** */
function eachProjectItem(callback: (item: _ItemClasses) => void)
{
      let i = 0;
      const { length } = app.project.items;
      while (i < length) callback(app.project.items[++i]);
}
/** 对项目里的所有图层进行操作 */
function eachProjectLayers(callback: (layer: Layer) => void)
{
      eachCompItems(compItem => eachCompItemLayers(compItem, layer => callback(layer)));
}
/** 对项目里的每个图层的每个属性进行操作 */
function eachProjectLayersProperties(callback: (property: Property) => void)
{
      eachProjectLayers(layer => eachPropertyGroup(layer, property => callback(property)));
}
/** 对项目里每个有表达式的属性进行操作 */
function eachProjectLayersExpressionProperties(callback: (property: Property) => void)
{
      eachProjectLayersProperties(property => property.expression !== '' && property.canSetExpression && callback(property));
}
/** 对选择的所有合成进行操作 */
function eachSelectedCompItems(callback: (compItem: CompItem) => void)
{
      eachCompItems(compItem => compItem.selected && callback(compItem));
}
/** 对选择合成里的所有图层进行操作 */
function eachSelectedCompItemLayers(callback: (layer: Layer) => void)
{
      eachSelectedCompItems(activeItem =>
      {
            let i = -1;
            const layers = activeItem.layers;
            const length = layers.length;
            while (++i < length) callback(layers[i]);
      });
}
/** 对选择合成里的所有图层属性属性进行操作 */
function eachSelectedCompItemLayersProperties(callback: (property: Property) => void)
{
      eachSelectedCompItemLayers(layer => eachPropertyGroup(layer, property => callback(property)));
}
/** */
function eachSelectedCompItemLayersExpressionProperties(callback: (property: Property) => void)
{
      eachSelectedCompItemLayersProperties(property => property.expression !== '' && property.canSetExpression && callback(property));
}
/** 遍历选活动合成选择的图层 */
function eachSelectedLayers(callback: (layer: Layer) => void)
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
}
/** 对活动合成里的所有选中图层的所有属性进行操作 */
function eachSelectedLayersProperties(callback: (property: Property) => void)
{
      eachSelectedLayers(layer => eachPropertyGroup(layer, property => callback(property)));
}
/** 对活动合成里的所有选中图层的所有有表达式的属性进行操作 */
function eachSelectedLayersExpressionProperties(callback: (property: Property) => void)
{
      eachSelectedLayersProperties(property => property.expression !== '' && property.canSetExpression && callback(property));
}
/** 对活动合成选中的属性进行遍历 */
function eachSelectedProperties(callback: (property: Property) => void)
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
}
/** */
function eachSelectedKeyframe(callback: (property: Property, selectedKeyframeID: number) => void)
{
      eachSelectedProperties(property =>
      {
            const { selectedKeys } = property;
            if (selectedKeys.length < 0) return;
            let i = 0;
            const { length } = selectedKeys;
            while (i < length) { callback(property, selectedKeys[i]); ++i; }
      });
}
/** 通过名字查找活动合成*/
function findCompItem(name: string): CompItem[] | null
{
      const result: CompItem[] = [];
      eachCompItems(item => item.name === name && result.push(item));
      return result.length < 1 ? null : result;
}
/** 对活动合成进行操作 */
function activeCompItemEnviron(callback: (compItem: CompItem) => void)
{
      const activeItem = app.project.activeItem;
      isCompItem(activeItem) && callback(activeItem);
}

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
