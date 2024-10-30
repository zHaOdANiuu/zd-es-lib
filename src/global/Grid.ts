class Grid
{
      private cache: unknown[][] = [];
      constructor(width: number, height: number)
      {
            for (let i = width; i--;)
            {
                  this.cache.push([]);
                  for (let ii = height; ii--;) this.cache[i].push(null);
            }
      }
      setProperty(x: number, y: number, value: unknown)
      {
            this.cache[x][y] = value;
      }
      getProperty(x: number, y: number)
      {
            return this.cache[x][y];
      }
      deleteProperty(x: number, y: number)
      {
            this.cache[x].splice(y, 1);
      }
      moveTo(oldPosition: [x: number, y: number], newPosition: [x: number, y: number])
      {
            this.cache[oldPosition[0]][oldPosition[1]] = [
                  this.cache[newPosition[0]][newPosition[1]],
                  this.cache[oldPosition[0]][oldPosition[1]] =
                  this.cache[newPosition[0]][newPosition[1]]
            ][0];
      }
}

export default Grid;
