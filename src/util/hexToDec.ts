function hexToDec(hexString: string)
{
      const data = parseInt(hexString.charCodeAt(0).toString(16), 16)
      return isNaN(data) ? 0 : data
}

export default hexToDec
