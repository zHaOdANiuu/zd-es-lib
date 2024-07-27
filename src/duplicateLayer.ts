function duplicateLayer(layer: Layer, num: number)
{
      while (num)
      {
            layer.duplicate();
            --num;
      }
}

export default duplicateLayer;
