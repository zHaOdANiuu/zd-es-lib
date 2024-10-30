/**
 * 添加大量属性
 * @param propertyGroup
 * @param propertyNames
 * // 给形状层的组添加填充和描边属性,以&&分割属性名
 * @example addProperties(group,'fill&&stroke‘)
 */
function addProperties(propertyGroup: PropertyGroup | Layer, propertyNames: string)
{
      const A = propertyNames.split('&&');
      let i = -1;
      const { length } = A;
      while (++i < length) propertyGroup.addProperty(A[i]);
}

export default addProperties;
