import forOwn from './forOwn'
import has from './has'

/**
 * 更改要更改的对象属性
 * @param src 要更改的对象
 * @param properties 要更改的属性
 */
function modify<T extends object>(src: T, properties: T): void {
  forOwn(properties, (v, k) => {
    if (has(src, k)) src[k as keyof T] = v
  })
}

export default modify
