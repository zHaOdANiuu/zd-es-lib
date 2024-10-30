/**
 * 查找属性组中的属性,以'/'为分隔符
 * @example findProperty(group, 'a/b/c')
 */
function findProperty(group: PropertyGroup, path: string): _PropertyClasses
{
      let i = -1;
      const names = path.split('/');
      const { length } = names;
      while (++i < length) (group as any) = group.property(names[i]);
      return group;
}

export default findProperty;
