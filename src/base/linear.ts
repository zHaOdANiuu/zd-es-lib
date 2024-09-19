function linear(t: number, tMin: number, tMax: number, value1?: number, value2?: number): number
{
      return value1 && value2
            ? value1 + (value2 - value1) * (t - tMin) / (tMax - tMin)
            : (t - tMin) / (tMax - tMin);
}
    
export default linear;
