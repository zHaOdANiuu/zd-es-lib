interface Style
{
      fill?: number[];
      stroke?: [color: number[], width: number];
}

const _intFillWithStroke = (graph: ScriptUIGraphics, style: Style) =>
{
      style.stroke &&
                  graph.strokePath(graph.newPen(0, style.stroke[0], style.stroke[1]))
      style.fill && graph.fillPath(graph.newBrush(0, style.fill))
}
/** 用于绘制UI的工具函数 */
const Graphics = {
      setFgColor(element: StaticText | ListBox | TreeView, color: number[])
      {
            element.graphics.foregroundColor = element.graphics.newPen(0, color, 1)
      },
      setBgColor(element: Window | Group | Panel, color: number[])
      {
            element.graphics.backgroundColor = element.graphics.newBrush(0, color)
      },
      fillBg(graph: ScriptUIGraphics, size: number[], color: number[])
      {
            graph.rectPath(0, 0, size[0], size[1])
            graph.fillPath(graph.newBrush(0, color))
      },
      drawLine(graph: ScriptUIGraphics, width: number, color: number[], fromPos: number[], toPos: number[])
      {
            graph.newPath()
            graph.moveTo(fromPos[0], fromPos[1])
            graph.lineTo(toPos[0], toPos[1])
            graph.strokePath(graph.newPen(0, color, width ? width : 1))
      },
      drawSquare(graph: ScriptUIGraphics, size: number, position: number[], color: number[])
      {
            const temp = size / 2
            graph.rectPath(
                  position[0] - temp,
                  position[1] - temp,
                  size,
                  size
            )
            graph.fillPath(graph.newBrush(0, color))
      },
      drawPoint(graph: ScriptUIGraphics, size: number, position: number[], color: number[])
      {
            const temp = size / 2
            graph.ellipsePath(
                  position[0] - temp,
                  position[1] - temp,
                  size,
                  size
            )
            graph.fillPath(graph.newBrush(0, color))
      },
      drawRect(graph: ScriptUIGraphics, sourceRect: SourceRect, style: Style)
      {
            graph.newPath()
            const stroke = style.stroke ? style.stroke[1] : 0
            const offset = stroke * 2
            graph.rectPath(
                  sourceRect[0] + stroke,
                  sourceRect[1] + stroke,
                  sourceRect[2] - offset,
                  sourceRect[3] - offset
            )
            _intFillWithStroke(graph, style)
      },
      drawCircle(graph: ScriptUIGraphics, sourceRect: SourceRect, style: Style)
      {
            graph.newPath()
            const stroke = style.stroke ? style.stroke[1] : 0
            const offset = stroke * 2
            graph.ellipsePath(
                  sourceRect[0] + stroke,
                  sourceRect[1] + stroke,
                  sourceRect[2] - offset,
                  sourceRect[3] - offset
            )
            _intFillWithStroke(graph, style)
      },
      drawString(graph: ScriptUIGraphics, text: string, color: number[], x?: number, y?: number, font?: ScriptUIFont)
      {
            graph.drawString(text, graph.newPen(0, color, 1), x || 0, y || 0, font)
      },
      drawPath(graph: ScriptUIGraphics, points: number[][], style: Style, close?: boolean)
      {
            graph.newPath()
            graph.moveTo(points[0][0], points[0][1])
            let i = 0
            const len = points.length
            while (++i < len) graph.lineTo(points[i][0], points[i][1])
            _intFillWithStroke(graph, style)
            close && graph.closePath()
      },
      drawGrid(graph: ScriptUIGraphics, size: number[], row: number, col: number, stroke: [color: number[], width: number])
      {
            const w = size[0] / row
            const h = size[1] / col
            let x: number
            let y: number
            graph.newPath()
            for (let i = - 1; ++i < row;)
            {
                  x = w * i
                  graph.moveTo(x, 0)
                  graph.lineTo(x, size[1])
                  for (let j = -1; ++j < col;)
                  {
                        y = h * j
                        graph.moveTo(0, y)
                        graph.lineTo(size[0], y)
                  }
            }
            graph.strokePath(graph.newPen(0, stroke[0], stroke[1]))
      }
}

export default Graphics
