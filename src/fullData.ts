function fullData()
{
      const data = new Date();
      return data.getFullYear() + '|' +
        data.getMonth() + 1 + '|' +
        data.getDate() + '|' +
        data.getHours() + ':' +
        data.getMinutes() + ':' +
        data.getSeconds();
}

export default fullData;
