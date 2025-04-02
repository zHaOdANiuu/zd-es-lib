function isReadwrite<T extends object>(o: T, k: keyof T & string) {
  return o.reflect.find(k).type === 'readwrite'
}

export default isReadwrite
