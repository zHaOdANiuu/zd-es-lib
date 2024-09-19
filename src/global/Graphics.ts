interface Style
{
      fill?: number[];
      stroke?: [color: number[], width: number];
}
interface Options extends Style
{
      size: number[];
}

const Graphics = {
      setFgColor(element: StaticText | ListBox | TreeView, color: number[])
      {
            element.graphics.foregroundColor = element.graphics.newPen(0, color, 1);
      },
      setBgColor(element: Window | Group | Panel, color: number[])
      {
            element.graphics.backgroundColor = element.graphics.newBrush(0, color);
      },
      fillBg(graph: ScriptUIGraphics, size: number[], color: number[])
      {
            graph.rectPath(0, 0, size[0], size[1]);
            graph.fillPath(graph.newBrush(0, color));
      },
      drawLine(
            graph: ScriptUIGraphics,
            fromPos: number[],
            toPos: number[],
            color: number[],
            width: number
      )
      {
            graph.newPath();
            graph.moveTo(fromPos[0], fromPos[1]);
            graph.lineTo(toPos[0], toPos[1]);
            graph.strokePath(graph.newPen(0, color, width ? width : 1));
      },
      drawSquare(graph: ScriptUIGraphics, position: number[], size: number[], color: number[])
      {
            graph.rectPath(
                  position[0] - size[0] / 2,
                  position[1] - size[1] / 2,
                  size[0],
                  size[1]
            );
            graph.fillPath(graph.newBrush(0, color));
      },
      drawPoint(graph: ScriptUIGraphics, position: number[], size: number[], color: number[])
      {
            graph.ellipsePath(
                  position[0] - size[0] / 2,
                  position[1] - size[1] / 2,
                  size[0],
                  size[1]
            );
            graph.fillPath(graph.newBrush(0, color));
      },
      drawRect(graph: ScriptUIGraphics, position: number[], options: Options)
      {
            graph.newPath();
            const stroke = options.stroke ? options.stroke[1] : 0;
            const offset = stroke * 2;
            graph.rectPath(
                  position[0] + stroke,
                  position[1] + stroke,
                  options.size[0] - offset,
                  options.size[1] - offset
            );
            this._intFillWithStroke(graph, options);
      },
      drawCircle(graph: ScriptUIGraphics, position: number[], options: Options)
      {
            graph.newPath();
            const stroke = options.stroke ? options.stroke[1] : 0;
            const offset = stroke * 2;
            graph.ellipsePath(
                  position[0] + stroke,
                  position[1] + stroke,
                  options.size[0] - offset,
                  options.size[1] - offset
            );
            this._intFillWithStroke(graph, options);
      },
      drawString(
            graph: ScriptUIGraphics,
            text: string,
            color: number[],
            x?: number,
            y?: number,
            font?: ScriptUIFont
      )
      {
            graph.drawString(text, graph.newPen(0, color, 1), x || 0, y || 0, font);
      },
      drawPath(graph: ScriptUIGraphics, points: number[][], style: Style, close?: boolean)
      {
            graph.newPath();
            graph.moveTo(points[0][0], points[0][1]);
            let i = 0;
            const { length } = points;
            while (i < length) graph.lineTo(points[++i][0], points[i][1]);
            this._intFillWithStroke(graph, style);
            close && graph.closePath();
      },
      drawGrid(graph: ScriptUIGraphics, size: number[], row: number, col: number, stroke: [color: number[], width: number])
      {
            const w = size[0] / row;
            const h = size[1] / col;
            let x: number;
            let y: number;
            graph.newPath();
            for (let i = - 1; ++i < row;)
            {
                  x = w * i;
                  graph.moveTo(x, 0);
                  graph.lineTo(x, size[1]);
                  for (let j = -1; ++j < col;)
                  {
                        y = h * j;
                        graph.moveTo(0, y);
                        graph.lineTo(size[0], y);
                  }
            }
            graph.strokePath(graph.newPen(0, stroke[0], stroke[1]));
      },
      _intFillWithStroke(graph: ScriptUIGraphics, options: Options | Style)
      {
            options.stroke &&
                  graph.strokePath(graph.newPen(0, options.stroke[0], options.stroke[1]));
            options.fill && graph.fillPath(graph.newBrush(0, options.fill));
      }
};

export default Graphics;
