/**
 * 给控件添加回车事件
 * @param element 控件
 * @param callback 触发后的函数
 */
function enterEvent<T extends EditText>(element: T, callback: (this: T, event: KeyboardEvent) => void)
{
      element.addEventListener('keydown', e => e.keyName === 'Enter' && callback.call(element, e));
}
/** 我不知道为什么脚本的事件类型enterKer注册了以后会没有用 */
export default enterEvent;
