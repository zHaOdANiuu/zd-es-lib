function mouseoverOrOutChangeColor(
      controlObj: Button,
      overColor: number[],
      outColor: number[],
      pen: { color: [number, number, number]; width: number },
      justify: 'left' | 'center' | 'right',
      font?: { name: string; style: string; size: number }
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
            this.graphics.rectPath(0, 0, this.size[0], this.size[1]);
            this.graphics.fillPath(this.graphics.newBrush(0, defaultColor));
            this.graphics.drawString(
                  this.text,
                  this.graphics.newPen(0, pen.color, pen.width),
                  x,
                  0,
                  _font
            );
      };
      controlObj.addEventListener('mouseover', () =>
      {
            defaultColor = overColor;
            controlObj.notify('onDraw');
      });
      controlObj.addEventListener('mouseout', () =>
      {
            defaultColor = outColor;
            controlObj.notify('onDraw');
      });
}

export default mouseoverOrOutChangeColor;
