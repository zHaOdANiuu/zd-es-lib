class EffectExtends
{
      layer: AVLayer;
      constructor(layer: AVLayer)
      {
            this.layer = layer;
      }
      addEffect(name: string)
      {
            this.layer.effect.addProperty(name);
      }
      removeEffect(id: string | number)
      {
            const effect = this.findEffect(id);
            effect && effect.remove();
      }
      findEffect(id: string | number): PropertyGroup | undefined
      {
            let length = this.layer.effect.numProperties;
            while (length)
            {
                  --length;
                  const effect = this.layer.effect.property(length) as PropertyGroup;
                  if (effect.name === id || effect.matchName === id || effect.propertyIndex === id) return effect;
            }
      }
}

export default EffectExtends;
