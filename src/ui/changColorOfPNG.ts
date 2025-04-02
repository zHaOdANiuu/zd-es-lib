import hexToString from "../util/hexToString"


function changColorOfPNG(png: string, newColor: HexColorString)
{
      return png.replace(png.substring(43, 45), () => hexToString(newColor.substring(1)))
}

export default changColorOfPNG
