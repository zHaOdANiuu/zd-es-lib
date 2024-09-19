import { trim, trimEnd } from './lib/es5';

function pcInfo()
{
      const result: Record<'Description' | 'MACAddress' | 'PNPDeviceID', string>[] = [];
      const winData = system
            .callSystem('WMIC Path Win32_NetworkAdapter WHERE PhysicalAdapter=TRUE GET Description,MACADDRESS,PNPDeviceID')
            .split('\n');
      const macID = winData[0].indexOf('MACAddress');
      const pnpID = winData[0].indexOf('PNPDeviceID');
      let i = 0;
      const len = winData.length;
      while (++i < len)
      {
            const line = winData[i];
            result.push({
                  Description: trimEnd(line.substring(0, macID)),
                  MACAddress:  trim(line.substring(macID, pnpID)),
                  PNPDeviceID: trim(line.substring(pnpID))
            });
            result;
      }
      return result;
}

export default pcInfo;
