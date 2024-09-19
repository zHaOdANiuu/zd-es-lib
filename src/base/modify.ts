import { hasOwn } from '../global/const';
import forOwn from './forOwn';

function modify<T extends object>(src: T, properties: T): void
{
      forOwn(properties, (v, k) =>
      {
            if (hasOwn(src, k)) src[k as keyof T] = v;
      });
}

export default modify;
