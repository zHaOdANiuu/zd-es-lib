import has from './has'

function forOwn<T extends object>(object: T, callback: ObjectIterator<T, void>) {
  for (const key in object) has(object, key) && callback(object[key], key, object)
}

export default forOwn
