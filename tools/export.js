'use strict';

const fs = require('fs');
const path = require('path');

const slashReg = /\\/g;

const rootDir = path.resolve(__dirname, '..').replace(slashReg, '/');
const dir = rootDir + '/src';
const output = rootDir + '/index.ts';

const exportDefaultArr = [];
const exportArr = [];
const exportDefaultReg = /export default ([^)]+)(?=;)/;
const exportReg = /export (const|class) (\w+)/g;
const exportAllReg = /export {[^(]+}/;
const pathReg = /\.ts$/;

const encoding = 'utf8';
const space_6 = ' '.repeat(6);
fs.readdirSync(dir, { recursive: true })
      .filter(file => file.endsWith('.ts'))
      .map(file => path.join(dir, file).replace(slashReg, '/'))
      .forEach(file => {
            const data = fs.readFileSync(file, encoding);
            const outPath = file.replace(pathReg, '').replace(rootDir, '.');

            const exec1 = exportDefaultReg.exec(data);
            if (exec1) {
                  exportDefaultArr.push(`export { default as ${exec1[1]} } from '${outPath}';`);
                  return;
            }
            const exec2 = data.match(exportReg);
            if (exec2) {
                  exportArr.push(
                        `export {\n${exec2.map(s => space_6 + s.split(' ')[2]).join(',\n')}\n} from '${outPath}';`
                  );
                  return;
            }
            const exec3 = exportAllReg.exec(data);
            exec3 && exportArr.push(`${exec3[0]} from '${outPath}';`);
      });

fs.writeFileSync(
      output,
      ['/// <reference types="./src/@types/index.d.ts" />', ...exportArr, ...exportDefaultArr].join('\n') + '\n'
);
