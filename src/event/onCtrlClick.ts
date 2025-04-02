/**
 * 给控件添加ctrl + 左键事件
 * @param element 有onClick事件的控件
 * @param callback 触发以后的回调函数
 */

function onCtrlClick<T extends _Control>(element: T, callback: (this: T, event: MouseEvent) => void)
{
      element.addEventListener('click', e =>
      {
            e.ctrlKey
            && e.button === 0
            && e.detail === 1
            && callback.call(element, e)
      })
}

export default onCtrlClick
