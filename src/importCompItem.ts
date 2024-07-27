import { activeCompItemEnviron } from './Ae';

function importCompItem(compItemID: number)
{
      const comp = app.project.itemByID(compItemID);
      comp instanceof CompItem && activeCompItemEnviron(compItem => compItem.layers.add(comp));
}

export default importCompItem;
