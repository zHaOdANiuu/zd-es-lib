/* eslint-disable no-control-regex */
/* eslint-disable no-case-declarations */
import { isArray, isFunction, isNull, isUndefined } from '../base/const';
import forOwn from '../base/forOwn';
import $error from '../$error';
import duffDevice from '../duffDevice';

/** json的解析 */
const JSON = {
      parse(text: string)
      {
            try { return Function('', 'return ' + text)(); }
            catch (error: any) { $error(error); }
      },
      stringify: (function()
      {
            const tab = { '"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t' };
            const fn = (m: keyof typeof tab) => tab[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
            const reg = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function f(data: any): string
            {
                  if (isNull(data) || isUndefined(data)) return 'null';
                  switch (typeof data)
                  {
                        case 'number':
                              return isFinite(data) ? data.toString() : 'null';
                        case 'boolean':
                              return data + '';
                        case 'object':
                              if (isArray(data))
                              {
                                    const result = [ '[' ];
                                    duffDevice(data, (v, i) => { result.push((i ? ', ' : '') + f(v)); });
                                    result.push(']');
                                    return result.join('');
                              }
                              const result: string[] = [];
                              forOwn(data, (v, k) =>
                              {
                                    if (isFunction(v)) return;
                                    result.push('"' + k + '":' + f(v));
                              });
                              return '{' + result.join(',') + '}';
                  }
                  return '"' + data.replace(reg, fn) + '"';
            };
      }())
};

export default JSON;
