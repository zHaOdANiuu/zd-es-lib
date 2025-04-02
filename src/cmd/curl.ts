function curl(url: string)
{
      return system.callSystem('curl -s "' + url + '"')
}

export default curl
