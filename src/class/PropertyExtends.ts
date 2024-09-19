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
