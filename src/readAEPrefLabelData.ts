import Color from './global/Color';
import { map } from './lib/es5';
import readLnFile from './readLnFile';

function readAEPrefLabelData()
{
      const appVersion = app.version.substring(0, 4);
      const initPath = Folder.userData.toString() + '/Adobe/After Effects/' + appVersion + '/Adobe After Effects ' + appVersion;
      const prefPath = {
            zh_CN: initPath + ' 设置-indep-general.txt',
            en_US: initPath + ' Prefs-indep-general.txt'
      };
      const prefFile = new File(prefPath[app.isoLanguage as keyof typeof prefPath]);
      const labelKeys: string[] = [];
      readLnFile(prefFile, str =>
      {
            if (str === '["Label Preference Color Section 5"]')
            {
                  for (let i = -1; ++i < 16;) labelKeys.push(prefFile.readln());
                  return true;
            }
      });
      const parseAEPrefLabel = (str: string) =>
      {
            const reg = /"([^"]+)"/g;
            return str.replace(reg, () =>
            {
                  const execResult = reg.exec(str);
                  if (execResult) return execResult[0].charCodeAt(1).toString(16);
            });
      };
      return map(
            labelKeys.slice(0, 1).concat(labelKeys.slice(8, 16), labelKeys.slice(1, 8)),
            value => Color.hexToRgb(parseAEPrefLabel(value.split(' = ')[1].slice(2)))
      );
}

export default readAEPrefLabelData;
