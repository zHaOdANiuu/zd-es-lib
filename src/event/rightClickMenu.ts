/**
 * 给控件添加右键菜单事件
 * @param container 要容纳的控件
 * @param window 要显示的菜单
 */
function rightClickMenu(container: _Control, window: Window)
{
      window.onDeactivate = function()
      {
            this.hide();
      };
      container.addEventListener('click', e =>
      {
            if (e.button === 2 && e.detail === 1)
            {
                  window.frameLocation = [ e.screenX, e.screenY ] as Point;
                  window.show();
            }
      });
}

export default rightClickMenu;
