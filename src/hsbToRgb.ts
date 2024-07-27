import { hsbNormalize } from './global/const';

function hsbToRgb(hsb: number[])
{
      const [ h, s, b ] = hsbNormalize(hsb);

      let r, g, _b;

      if (s === 0) r = g = _b = b;
      else
      {
            const i = Math.round(h * 6);
            const f = h * 6 - i;
            const p = b * (1 - s);
            const q = b * (1 - s * f);
            const t = b * (1 - s * (1 - f));

            switch (i % 6)
            {
                  case 0: r = b, g = t, _b = p; break;
                  case 1: r = q, g = b, _b = p; break;
                  case 2: r = p, g = b, _b = t; break;
                  case 3: r = p, g = q, _b = b; break;
                  case 4: r = t, g = p, _b = b; break;
                  case 5: r = b, g = p, _b = q; break;
            }
      }

      return [
            Math.round((r as number) * 255),
            Math.round((g as number) * 255),
            Math.round((_b as number) * 255)
      ];
}

export default hsbToRgb;
