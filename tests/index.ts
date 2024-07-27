import { activeCompItemEnviron } from '../src/Ae';
import propertyToJSON from '../src/parseProperty';

activeCompItemEnviron(compItem =>
{
      const layer = compItem.layer(1);
      propertyToJSON(layer.position, Folder.desktop.fsName + '\\try.json');
});
