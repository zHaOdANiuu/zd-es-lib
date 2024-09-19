/**
 * 添加大量属性
 * @param propertyGroup
 * @param propertyNames
 * @example addProperties(group,'fill&&stroke‘)
 */
function addProperties(propertyGroup: PropertyGroup | Layer, propertyNames: string)
{
      const A = propertyNames.split('&&');
      let i = -1;
      const len = A.length;
      while (++i < len) propertyGroup.addProperty(A[i]);
}

export default addProperties;
