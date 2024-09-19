function threeBezier(t: number, p1: pos, cp1: pos, cp2: pos, p2: pos)
{
      const [ x1, y1 ] = p1;
      const [ x2, y2 ] = p2;
      const [ cx1, cy1 ] = cp1;
      const [ cx2, cy2 ] = cp2;
      const t1 = 1 - t;
      const t12 = t1 * t1;
      const t13 = t12 * t1;
      const t2 = t * t;
      const t3 = t2 * t;
      return [
            x1 * t13 + 3 * cx1 * t * t12 + 3 * cx2 * t2 * (1 - t) + x2 * t3,
            y1 * t13 + 3 * cy1 * t * t12 + 3 * cy2 * t2 * (1 - t) + y2 * t3
      ];
}

export default threeBezier;
