/**
 * 给控件添加右键菜单事件
 * @param container 要容纳的控件
 * @param element 要显示的菜单
 */
function rightClickMenu(container: _Control, element: Window)
{
      element.addEventListener('blur', () => element.hide());
      container.addEventListener('mousedown', event =>
      {
            if (event.button === 2 && event.detail === 1)
            {
                  element.frameLocation = [ event.screenX, event.screenY ] as Point;
                  element.show();
            }
      });
}

export default rightClickMenu;
