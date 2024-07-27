function setPropertiesValues(propertyGroup: PropertyGroup, values: any): void
{
      for (const key in values)
      {
            const prop = propertyGroup.property(key);
            prop instanceof Property && prop.setValue(values[key]);
      }
}

export default setPropertiesValues;
