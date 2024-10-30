interface Options
{
      title: string; /** 窗口标题 */
      maxProgress: number; /** 进度条最大值 */
      progressBarSize?: TwoDPoint; /** 进度条大小 */
}
/**
 * 加载窗口
 * @param options 配置选项
 * @returns (loadValue, loadText) => void
 * @static close(): void 关闭窗口
 * @example
 * const w = $$$LoadWindow({
 *    title:       'string',
 *    maxProgress: 1000
 * });
 * for (let i = -1; ++i < 1000;) w(1, '' + i);
 */
function $$$LoadWindow(options: Options)
{
      const win = new Window('palette', options.title);
      const prog = win.add('progressbar', [ 0, 0, 300, 80 ], 0, options.maxProgress);
      const statText = win.add('statictext');
      if (options.progressBarSize) prog.size = options.progressBarSize;
      win.alignChildren = [ 'fill', 'fill' ]; statText.justify = 'center'; win.show();
      ($$$LoadWindow as any).close = () => { win.close(); };
      return (loadValue: number, loadText: string) =>
      {
            prog.value = prog.value + loadValue; statText.text = loadText; win.update();
      };
}

export default $$$LoadWindow;
