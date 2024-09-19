import { rgbNormalize } from './global/const';

function rgbToHsb(rgb: number[])
{
      const [ r, g, b ] = rgbNormalize(rgb);
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;

      let h = max;
      if (delta === 0) h = 0;
      else if (max === r) h = (g - b) / delta % 6;
      else if (max === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;

      return [
            Math.round(h * 60),
            Math.round(delta === 0 ? 0 : delta / max * 100),
            Math.round(max * 100)
      ];
}

export default rgbToHsb;
