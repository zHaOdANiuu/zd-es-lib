function unwatch2<T extends object, U extends keyof T>(obj: T, key: U) {
  unwatch.call(obj, key)
}

export default unwatch2
