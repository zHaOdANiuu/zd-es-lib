import Graphics from '../global/Graphics';
import mouseoverOrOut from './mouseoverOrOut';

function mouseoverOrOutChangeColor(
      controlObj: Button | Image | CustomView,
      overColor: number[],
      outColor: number[],
      penColor: number[],
      justify: 'left' | 'center' | 'right',
      font?: { name: string; style: number; size: number }
)
{
      let defaultColor = outColor;
      const _font = font && ScriptUI.newFont(font.name, font.style, font.size);
      const space = controlObj.size[0] - controlObj.graphics.measureString(controlObj.text, _font)[0];
      const x = {
            left:   0,
            center: space / 2,
            right:  controlObj.size[0] - space
      }[justify];
      controlObj.onDraw = function()
      {
            Graphics.drawRect(this.graphics, [ 0, 0 ], {
                  fill: defaultColor,
                  size: this.size
            });
            Graphics.drawString(this.graphics, this.text, penColor, x, 0, _font);
      };
      mouseoverOrOut(
            controlObj,
            () =>
            {
                  defaultColor = overColor;
                  controlObj.notify('onDraw');
            },
            () =>
            {
                  defaultColor = outColor;
                  controlObj.notify('onDraw');
            }
      );
}

export default mouseoverOrOutChangeColor;
