import { undef } from '../global/const';

/**
 * 给控件添加ctrl + 单击事件
 * @param element 有onClick事件的控件
 * @param callback1 触发以后的回调函数
 * @param callback2 触发失败的回调函数
 */

function onCtrlClick<T extends Button>(
      element: T,
      callback1: (this: T) => void,
      callback2?: (this: T) => void
)
{
      element.addEventListener('mousedown', event =>
      {
            if (event.ctrlKey === true) element.onClick = callback1;
            else if (callback2 !== undef) element.onClick = callback2;
            else (element as any).onClick = undef;
      });
}

export default onCtrlClick;
