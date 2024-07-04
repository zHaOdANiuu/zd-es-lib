import { undef } from './const';

const JSON = {
      parse(text: string, reviver?: (key: string, value: PropertyKey) => unknown): Record<string, unknown> | void
      {
            try
            {
                  if (text[0] !== '{') throw 'Invalid JSON';
                  const data = Function.call({}, 'return ' + text)();
                  if (reviver === undef) return data;
                  let _: unknown;
                  (function fn(value: Record<string, unknown>, key: string)
                  {
                        if (typeof value !== 'object' || value === null) return reviver(key, value);
                        for (const k in value)
                        {
                              if (!Object.prototype.hasOwnProperty.call(value, k)) continue;
                              _ = fn(value, k);
                              if (_ === undef) delete value[k];
                              else value[k] = _;
                        }
                  }({ '': data }, ''));
            }
            catch (error: any)
            {
                  throw error.line.toString() + '\n' + error.message;
            }
      },
      stringify: (app as any).objectToJSON as
      (data: string, replacer?: (key: string, value: unknown) => unknown | string[], space?: number | string) => string
};

export default JSON;
