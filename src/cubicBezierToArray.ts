import cubicBezier from './cubicBezier';

function cubicBezierToArray(
      step: NumberRange<0.01, 1>,
      vertex1: TwoDPoint,
      control1: TwoDPoint,
      vertex2: TwoDPoint,
      control2: TwoDPoint
)
{
      const bezierArray = [];
      let i = 0;
      const num = 1 + step;
      while (i < num)
      {
            i += step;
            bezierArray.push(cubicBezier(i, vertex2, control2, control1, vertex1));
      }
      return bezierArray;
}

export default cubicBezierToArray;
