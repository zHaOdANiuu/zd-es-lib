/**
 *
 * @param group
 * @param path
 * @returns
 * @example
 * findProperty(group, 'a/b/c')
 */
function findProperty(group: PropertyGroup, path: string): _PropertyClasses
{
      let i = -1;
      const names = path.split('/');
      const len = names.length;
      while (++i < len) (group as any) = group.property(names[i]);
      return group;
}

export default findProperty;
