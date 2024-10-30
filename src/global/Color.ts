import { random } from '../base/const';

/** 处理颜色相关的工具函数 */
const Color = {
      rgbNormalize(rgb: number[]) { return [ rgb[0] / 255, rgb[1] / 255, rgb[2] / 255 ]; },
      hsbNormalize(hsb: number[]) { return [ hsb[0] / 360, hsb[1] / 100, hsb[2] / 100 ]; },
      randomHexColor() { return this.rgbToHex([ random(0, 255), random(0, 255), random(0, 255) ]); },
      rgbToHex(rgb: number[]) { return '#' + ((rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16); },
      // rgbToXyz(r: NormalizeValue) { return (r /= 255) <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4); },
      // xyzToRgb(r: NormalizeValue) { return Math.round(255 * r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 0.4166666666666667) - 0.055); },
      hexToRgb(hex: string)
      {
            const result = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(hex);
            return result ? [ parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ] : null;
      },
      rgbToHsb(rgb: number[])
      {
            const [ r, g, b ] = this.rgbNormalize(rgb);
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
      },
      hsbToRgb(hsb: number[])
      {
            const [ h, s, b ] = this.hsbNormalize(hsb);
            let r, g, _b;
            if (s === 0) r = g = _b = b;
            else
            {
                  const i = Math.floor(h * 6);
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
            ] as number[];
      },
      rgbGradient(t: number, rgbStart: number[], rgbEnd: number[]): number[][]
      {
            const result: number[] = [];
            let i = -1;
            const len = 3;
            while (++i < len) result.push(rgbStart[i] + t * (rgbEnd[i] - rgbStart[i]));
            return result as unknown as number[][];
      }
};

export default Color;
