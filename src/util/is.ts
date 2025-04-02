import { ObjectPrototype } from './const'

export const isNull = (o: any): o is null => o === null

export const isNil = (o: any): o is undefined | null => isNull(o) || o === undef

export const isUndefined = (o: any): o is undefined => o === undef

export const isBoolean = (o: any): o is boolean => typeof o === 'boolean'

export const isNumber = (o: any): o is number => typeof o === 'number'

export const isString = (o: any): o is string => typeof o === 'string'

export const isFunction = (o: any): o is AnyFunction => typeof o === 'function'

export const isArray = (o: any): o is any[] => ObjectPrototype.toString.call(o) === '[object Array]'
