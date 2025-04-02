import { ObjectPrototype } from './const'

function has<T extends object>(obj: T, key: string | number | keyof T): key is keyof T {
  return ObjectPrototype.hasOwnProperty.call(obj, key) as boolean
}

export default has
