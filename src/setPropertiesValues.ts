import { isProperty } from './base/const';

function setPropertiesValues(propertyGroup: PropertyGroup, values: any): void
{
      for (const key in values)
      {
            const prop = propertyGroup.property(key);
            isProperty(prop) && prop.setValue(values[key]);
      }
}

export default setPropertiesValues;
