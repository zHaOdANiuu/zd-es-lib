import { activeCompItemEnviron } from './Ae';
import { isCompItem } from './base/const';

function importCompItem(compItemID: number)
{
      const comp = app.project.itemByID(compItemID);
      isCompItem(comp) && activeCompItemEnviron(compItem => compItem.layers.add(comp));
}

export default importCompItem;
