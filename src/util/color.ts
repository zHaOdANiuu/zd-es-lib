export const NORMALIZE = 255
export const MAX_HUE = 360
export const HUE_FACTOR = 60
export const PERCENTAGE_FACTOR = 100

export function rgb(r: number, g: number, b: number) {
  return [r / NORMALIZE, g / NORMALIZE, b / NORMALIZE]
}

export function hsb(h: number, s: number, b: number) {
  return [h / MAX_HUE, s / 100, b / 100]
}

export function hex2Rgb(hex: HexColorString) {
  const bigint = parseInt(hex.substring(1), 16)
  const r = (bigint >> 16) & NORMALIZE
  const g = (bigint >> 8) & NORMALIZE
  const b = bigint & NORMALIZE
  return [r, g, b]
}

export function rgb2Hsb(r: number, g: number, b: number) {
  r /= NORMALIZE
  g /= NORMALIZE
  b /= NORMALIZE

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) % 6
    else if (max === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4

    h *= HUE_FACTOR
  }

  return [
    Math.round(h),
    Math.round(max === 0 ? 0 : (delta / max) * PERCENTAGE_FACTOR),
    Math.round(max * PERCENTAGE_FACTOR)
  ]
}

export function hsb2Rgb(h: number, s: number, b: number) {
  if (s === 0) return [127.5, 127.5, 127.5]
  if (b === 0) return [0, 0, 0]
  s /= PERCENTAGE_FACTOR
  b /= PERCENTAGE_FACTOR

  const result = new Array(3)
  for (let i = -1, o = 240; ++i < 3; o -= 120) {
    let r = 0
    const t = Math.abs(((h + o) % MAX_HUE) - 240)
    if (t <= HUE_FACTOR) r = NORMALIZE
    else if (HUE_FACTOR < t && t < 120) r = (1 - (t - HUE_FACTOR) / HUE_FACTOR) * NORMALIZE
    r += (NORMALIZE - r) * (1 - s)
    result[i] = r * b
  }
  return result
}
