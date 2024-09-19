function duplicateLayer(layer: Layer, num: number)
{
      app.beginUndoGroup('Duplicate Layer');
      const comp = layer.containingComp;
      while (num--) comp.layer(layer.index - 1 || 1).duplicate();
      app.endUndoGroup();
}

export default duplicateLayer;
