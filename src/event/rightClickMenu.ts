/**
 * 给控件添加右键菜单事件
 * @param container 要容纳的控件
 * @param window 要显示的菜单
 */
function rightClickMenu(container: _Control, win: Window)
{
      win.addEventListener('blur', function(this: Window) { this.hide() })
      container.addEventListener('click', function(e)
      {
            if (e.button === 2 && e.detail === 1)
            {
                  win.frameLocation = [ e.screenX, e.screenY ] as Point
                  win.show()
            }
      })
}

export default rightClickMenu
