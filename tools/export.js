import { readdirSync, writeFileSync, readFileSync } from 'fs'
import { resolve, dirname, join } from 'path'

const slashReg = /\\/g

const rootDir = resolve(dirname(import.meta.dirname), '.').replace(slashReg, '/')

const dir = rootDir + '/src'
const output = rootDir + '/index.ts'
const exportDefaultArr = []
const exportArr = []
const exportDefaultReg = /export default ([^)]+)/
const exportReg = /export (const|function|class) (\w+)/g
const exportAllReg = /export {[^(]+}/
const pathReg = /\.ts$/

const encoding = 'utf8'
const space = ' '.repeat(6)
readdirSync(dir, { recursive: true })
  .filter(file => file.endsWith('.ts'))
  .map(file => join(dir, file).replace(slashReg, '/'))
  .forEach(file => {
    const data = readFileSync(file, encoding)
    const outPath = file.replace(pathReg, '').replace(rootDir, '.')
    const exec1 = exportDefaultReg.exec(data)
    if (exec1) {
      exportDefaultArr.push(`export { default as ${exec1[1]} } from '${outPath}'`)
      return
    }
    const exec2 = data.match(exportReg)
    if (exec2) {
      exportArr.push(
        `export {\n${exec2.map(s => space + s.split(' ')[2]).join(',\n')}\n} from '${outPath}'`
      )
      return
    }
    const exec3 = exportAllReg.exec(data)
    exec3 && exportArr.push(`${exec3[0]} from '${outPath}'`)
  })

writeFileSync(
  output,
  ['/// <reference types="./env.d.ts" />', ...exportArr, ...exportDefaultArr].join('\n') + '\n'
)
