function timeToFrames(time: number, fps: number): number
{
      return Math.floor(time * fps);
}

export default timeToFrames;
