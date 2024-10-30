import { hasOwn } from './const';

function forOwn<T extends object>(object: T, callback: ObjectIterator<T, void>)
{
      for (const key in object) hasOwn(object, key) && callback(object[key], key, object);
}

export default forOwn;
