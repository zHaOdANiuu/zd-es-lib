import { isUndefined } from './const';

/** 遍历结构 => object.parent.parent.parent */
function traverseHierarchy
<T extends AnyObject, U extends keyof T>(
      obj: T,
      propertyName: U,
      condition: (property: T[U]) => boolean,
      callback?: (property: T[U]) => undefined
)
{
      let current = obj[propertyName];
      if (isUndefined(callback)) while (!condition(current)) current = current[propertyName];
      else while (!condition(current)) callback(current = current[propertyName]);
      return current;
}

export default traverseHierarchy;
