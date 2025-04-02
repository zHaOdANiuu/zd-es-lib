/**
 * 给控件添加回车事件
 * @param element 控件
 * @param callback 触发后的函数
 */
function enterEvent<T extends _Control>(element: T, callback: (this: T, event: KeyboardEvent) => void)
{
      element.addEventListener('keydown', e => e.keyName === 'Enter' && callback.call(element, e))
}

export default enterEvent
