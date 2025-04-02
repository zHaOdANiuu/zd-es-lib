import { APP_VERSION } from '../const'
import { nativeSlice } from './const'
import { isUndefined } from './is'

/**
 * Debounce function to prevent multiple calls in a short time
 * @param fn
 * @param duration default 1000ms
 */
function debounce(fn: AnyFunction, duration?: number) {
  if (APP_VERSION < 14) {
    alert('After Effects CC 2018 or above is required.')
  }
  if (isUndefined(duration)) duration = 1000
  let timerID = 0
  return function (this: any) {
    app.cancelTimeout(timerID)
    const args = nativeSlice.call(arguments)
    timerID = app.setTimeout(() => {
      fn.apply(this, args)
    }, duration)
  }
}

export default debounce
