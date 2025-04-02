function watch2<T extends object, U extends keyof T>(
  obj: T,
  key: U,
  callback: (val: T[U]) => void
) {
  obj.watch(key as any, (_a: any, _b: any, val: T[U]) => {
    callback(val)
  })
}

export default watch2
