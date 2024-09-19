import { nativeSlice, undef } from '../global/const';

function debounce(fn: AnyFunction, duration?: number)
{
      if (duration === undef) duration = 1000;
      return function(this: any)
      {
            const args = nativeSlice.call(arguments);
            const timerID = app.setTimeout(() =>
            {
                  app.cancelTimeout(timerID);
                  fn.apply(this, args);
            }, duration);
      };
}

export default debounce;
