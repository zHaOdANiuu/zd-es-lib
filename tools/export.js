'use strict';
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..').replace(/\\/g, '/');
const dir = rootDir + '/src';
const output = rootDir + '/index.ts';

const fillPaths = fs
      .readdirSync(dir, { recursive: true })
      .map(p => (dir + '/' + p).replace(/\\/g, '/'));

const exportDefaultArr = [];
const exportArr = [];
const exportDefaultReg = /export default ([^)]+)(?=;)/;
const exportReg = /export (const|class) (\w+)/g;
const exportAllReg = /export {[^(]+}/;

fillPaths.forEach(p => {
      if (!/.ts$/.test(p)) return;
      const data = fs.readFileSync(p);
      const _data = data.toString();
      const p2 = p.replace(/\.ts$/, '').replace(rootDir, '.');

      const exec1 = exportDefaultReg.exec(_data);
      if (exec1 !== null)
            exportDefaultArr.push(`export { default as ${exec1[0].split(' ')[2]} } from '${p2}';`);

      const exec2 = _data.match(exportReg);
      if (exec2 !== null)
            exportArr.push(
                  `export { ${exec2.map(s => s.split(' ')[2]).join(',\n')} } from '${p2}';`
            );

      const exec3 = exportAllReg.exec(_data);
      if (exec3 !== null) exportArr.push(exec3[0] + " from '" + p2 + "';");
});

fs.writeFileSync(output, exportArr.join('\n') + '\n' + exportDefaultArr.join('\n') + '\n');
