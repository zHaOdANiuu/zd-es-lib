import { isProperty } from './base/const';
import forOwn from './base/forOwn';

function setPropertiesValues<T extends PropertyGroup>(propertyGroup: T, values: Record<Extract<keyof T, string>, any>): void
{
      forOwn(values, (v, k) =>
      {
            const prop = propertyGroup.property(k);
            isProperty(prop) && prop.setValue(v);
      });
}

export default setPropertiesValues;
