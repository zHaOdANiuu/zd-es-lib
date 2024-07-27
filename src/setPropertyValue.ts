function setPropertyValue(propertyGroup: PropertyGroup, path: string, value: unknown)
{
      let i = -1;
      let result: Property | PropertyGroup = propertyGroup;
      const keys = path.split('/');
      const len = keys.length;
      while (++i < len) result = result.property(keys[i]);
      result instanceof Property && result.setValue(value);
}

export default setPropertyValue;
