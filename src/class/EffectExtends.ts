export class EffectExtends
{
      layer: AVLayer;
      effectGroup: PropertyGroup;
      constructor(layer: AVLayer)
      {
            this.layer = layer;
            this.effectGroup = layer.property('ADBE Effect Parade') as PropertyGroup;
      }
      addEffect(name: string)
      {
            this.effectGroup.addProperty(name);
      }
      removeEffect(id: string | number)
      {
            const effect = this.findEffect(id);
            effect && effect.remove();
      }
      findEffect(id: string | number): PropertyGroup | undefined
      {
            let length = this.effectGroup.numProperties;
            while (length)
            {
                  --length;
                  const effect = this.effectGroup.property(length) as PropertyGroup;
                  if (effect.name === id || effect.matchName === id || effect.propertyIndex === id) return effect;
            }
      }
      // importEffects()
      // {

      // }
      // exportEffects()
      // {
      //       this.layer.effect.selected = true;
      // }
}
