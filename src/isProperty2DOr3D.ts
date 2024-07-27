function isProperty2DOr3D(property: Property)
{
      if (property.propertyValueType === PropertyValueType.TwoD_SPATIAL
        || property.propertyValueType === PropertyValueType.TwoD)
            return '2D';
      else if (property.propertyValueType === PropertyValueType.ThreeD_SPATIAL
        || property.propertyValueType === PropertyValueType.ThreeD)
            return '3D';
      else return 'Unknown';
}

export default isProperty2DOr3D;
