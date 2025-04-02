function loop(count: number, iterant: AnyFunction) {
  for (let i = -1; ++i < count; ) iterant(i)
}

export default loop
