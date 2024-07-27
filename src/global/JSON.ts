import duffDevice from '../duffDevice';
import { hasOwn, typeString } from './const';

const JSON = (function()
{
      const parse = (text: string) =>
      {
            try { return Function.call({}, 'return ' + text)(); }
            catch (error: any) { throw error.line.toString() + '\n' + error.message; }
      };
      const parseArray = (value: unknown[]) =>
      {
            let result = '[';
            const len = value.length;
            duffDevice(value, (data, i) =>
            {
                  switch (typeof data)
                  {
                        case 'object':
                              result += data === null ? 'null' : stringify((data as object));
                              break;
                        case 'function':
                              break;
                        case 'undefined':
                              result += 'null';
                              break;
                        case 'string':
                              result += '"' + data + '"';
                              break;
                        default: result += data;
                  }
                  if (i < len - 1) result += ',';
            });
            return result + ']';
      };
      const parseType = (value: any, key: string) =>
      {
            let result = '';
            const type = typeof value;
            if (type === 'object')
                  result += '"' + key + '":' + (value === null && 'null'
                        || (typeString(value) === '[object Array]' && parseArray((value as []))
                              || stringify(value)) + ',');
            else switch (type)
            {
                  case 'function':
                        break;
                  case 'undefined':
                        result += 'null';
                        break;
                  case 'string':
                        result += '"' + key + '":' + '"' + value + '"' + ',';
                        break;
                  default:
                        result += '"' + key + '":' + value + ',';
                        break;
            }
            return result;
      };
      const stringify = (data: Record<string, any>) =>
      {
            let r = '{';
            for (const key in data) if (hasOwn(data, key)) r += parseType(data[key], key);
            return r.substring(0, r.length - 1) + '}';
      };
      return {
            parse,
            stringify
      };
}());

export default JSON;
