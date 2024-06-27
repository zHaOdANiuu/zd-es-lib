function forOwn<T extends Record<string, unknown>>(object: T, callback: ObjectIterator<T, void>)
{
      for (const key in object) Object.prototype.hasOwnProperty.call(object, key) && callback(object[key], key, object);
}

export default forOwn;
