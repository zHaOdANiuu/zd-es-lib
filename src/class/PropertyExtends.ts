/** 属性的扩展,调用此类,可以访问属性对应的图层和合成 */
class PropertyExtends
{
      comp: CompItem;
      layer: Layer;
      constructor(prop: _PropertyClasses)
      {
            this.layer = prop.propertyGroup(prop.propertyDepth) as Layer;
            this.comp = this.layer.containingComp;
      }
}

export default PropertyExtends;
