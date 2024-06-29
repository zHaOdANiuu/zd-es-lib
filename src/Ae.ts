const getProperties = (items: Layer | PropertyGroup): _PropertyClasses[] =>
{
      let i = 0;
      const length = items.numProperties;
      const result: _PropertyClasses[] = [];
      while (i < length) result.push(items.property(++i));
      return result;
};

/** 对属性组的每个属性进行操作 */
const eachPropertyGroup = (element: Layer | PropertyGroup, callback: (property: Property) => void) =>
{
      const result: _PropertyClasses[] = [];
      const properties = getProperties(element);
      const len = properties.length;
      for (let i = -1; ++i < len;)
      {
            const property = properties[i];
            if (property instanceof PropertyGroup) result.push(...getProperties(property));
            else if (property.isModified && property.canSetExpression) callback(property);
      }
};

/** 对活动合成进行操作 */
const activeCompItemEnviron = (callback: (compItem: CompItem) => void) =>
{
      const activeItem = app.project.activeItem;
      if (activeItem instanceof CompItem) callback(activeItem);
};

/** 对活动合成里的所有图层进行操作 */
const eachActiveCompItemLayers = (callback: (layer: Layer) => void) => activeCompItemEnviron((activeItem) =>
{
      let i = -1;
      const layers = activeItem.layers;
      const length = layers.length;
      while (++i < length) callback(layers[i]);
});

/** 对活动合成里的所有图层属性进行操作 */
const eachActiveCompItemLayersProperties = (callback: (property: Property) => void) => { eachActiveCompItemLayers((layer) => eachPropertyGroup(layer, (property) => callback(property))); };

/** 对活动合成里的所有含有表达式的属性进行操作 */
const eachActiveCompItemLayersExpressionProperties = (callback: (property: Property) => void) => { eachActiveCompItemLayersProperties((property) => property.expression !== '' && property.canSetExpression && callback(property)); };

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
            if (item instanceof CompItem) callback(item);
      }
};

/** 对项目里的所有图层进行操作 */
const eachProjectLayers = (callback: (layer: Layer) => void) => { eachCompItems((compItem) => eachCompItemLayers(compItem, (layer) => callback(layer))); };

/** 对项目里的每个图层的每个属性进行操作 */
const eachProjectLayersProperties = (callback: (property: Property) => void) => { eachProjectLayers((layer) => eachPropertyGroup(layer, (property) => callback(property))); };

/** 对项目里每个有表达式的属性进行操作 */
const eachProjectLayersExpressionProperties = (callback: (property: Property) => void) => { eachProjectLayersProperties((property) => property.expression !== '' && property.canSetExpression && callback(property)); };

/** 对选择的所有合成进行操作 */
const eachSelectedCompItems = (callback: (compItem: CompItem) => void) => { eachCompItems((compItem) => compItem.selected && callback(compItem)); };

/** 对选择合成里的所有图层进行操作 */
const eachSelectedCompItemLayers = (callback: (layer: Layer) => void) =>
{
      eachSelectedCompItems((activeItem) =>
      {
            let i = -1;
            const layers = activeItem.layers;
            const length = layers.length;
            while (++i < length) callback(layers[i]);
      });
};

/** 对选择合成里的所有图层属性属性进行操作 */
const eachSelectedCompItemLayersProperties = (callback: (property: Property) => void) => { eachSelectedCompItemLayers((layer) => eachPropertyGroup(layer, (property) => callback(property))); };

const eachSelectedCompItemLayersExpressionProperties = (callback: (property: Property) => void) => { eachSelectedCompItemLayersProperties((property) => property.expression !== '' && property.canSetExpression && callback(property)); };

const eachSelectedLayers = (callback: (layer: Layer) => void) =>
{
      activeCompItemEnviron((activeItem) =>
      {
            const selectedLayers = activeItem.selectedLayers;
            const length = selectedLayers.length;
            if (activeItem.selectedLayers.length > 1)
            {
                  let index = -1;
                  while (++index < length)
                  {
                        callback(selectedLayers[index]);
                  }
            }
      });
};

/** 对活动合成里的所有选中图层的所有属性进行操作 */
const eachSelectedLayersProperties = (callback: (property: Property) => void) => { eachSelectedLayers((layer) => eachPropertyGroup(layer, (property) => callback(property))); };

/** 对活动合成里的所有选中图层的所有有表达式的属性进行操作 */
const eachSelectedLayersExpressionProperties = (callback: (property: Property) => void) => { eachSelectedLayersProperties((property) => property.expression !== '' && property.canSetExpression && callback(property)); };

const eachSelectedProperties = (callback: (property: Property) => void) =>
{
      activeCompItemEnviron((compItem) =>
      {
            const selectedProperties = compItem.selectedProperties;
            const length = selectedProperties.length;
            if (length < 1) return;
            let i = -1;
            while (++i < length)
            {
                  const property = selectedProperties[i];
                  if (property instanceof Property && property.canSetExpression) callback(property);
            }
      });
};

const findCompItem = (name: string): CompItem[] | null =>
{
      const result: CompItem[] = [];
      eachCompItems((item) => item.name === name && result.push(item));
      return result.length < 1 ? null : result;
};

export {
      getProperties,
      eachPropertyGroup,
      activeCompItemEnviron,
      eachActiveCompItemLayers,
      eachActiveCompItemLayersProperties,
      eachActiveCompItemLayersExpressionProperties,
      eachCompItemLayers,
      eachCompItems,
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
      findCompItem
};
