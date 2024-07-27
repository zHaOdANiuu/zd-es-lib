import { forEach } from '../lib/es5';

function drawPath(
      graphics: ScriptUIGraphics,
      position: [number, number],
      points: [x: number, y: number][],
      isClosed: boolean,
      fillColor?: [R: number, G: number, B: number, A?: number],
      strokeWidth?: number,
      strokeColor?: [R: number, G: number, B: number, A?: number]
)
{
      if (!strokeWidth) strokeWidth = 0;
      graphics.newPath();
      graphics.moveTo(position[0] += strokeWidth, position[1] += strokeWidth);
      forEach(points, (point: number[]) => graphics.lineTo(point[0] + position[0], point[1] + position[1]));
      if (isClosed) graphics.closePath();
      if (fillColor) graphics.fillPath(graphics.newBrush(0, fillColor as number[]));
      if (strokeWidth) graphics.strokePath(graphics.newPen(0, strokeColor as number[], strokeWidth));
}

export default drawPath;
