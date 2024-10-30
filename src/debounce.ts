import { isUndefined, nativeSlice } from './base/const';

function debounce(fn: AnyFunction, duration?: number)
{
      if (isUndefined(duration)) duration = 1000;
      let timerID = 0;
      return function(this: any)
      {
            app.cancelTimeout(timerID);
            const args = nativeSlice.call(arguments);
            timerID = app.setTimeout(() =>
            {
                  fn.apply(this, args);
            }, duration);
      };
}

export default debounce;
