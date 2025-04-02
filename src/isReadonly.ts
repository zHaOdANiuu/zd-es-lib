function isReadonly<T extends object>(o: T, k: keyof T & string) {
  return o.reflect.find(k).type === 'readonly'
}

export default isReadonly
