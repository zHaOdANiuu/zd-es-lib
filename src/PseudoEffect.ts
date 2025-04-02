import { isFile } from './os/is'
import readFile from './os/readFile'
import writeFile from './os/writeFile'
import tempComp from './tempComp'
import toSource2 from './toSource2'

class PseudoEffect {
  public props: object
  private matchName: string
  private name: string
  private file: File
  private reMatchName: RegExp
  private reJSON: RegExp
  private reXML: RegExp
  private indexArray: AnyObject[]
  private textOffset: number
  constructor(binaryData: File)
  constructor(binaryData: string, savePath: string)
  constructor(binaryData: File | string, savePath?: string) {
    let data: string
    if (isFile(binaryData)) {
      const content = readFile(binaryData, 'BINARY')
      if (!content) throw 'PseudoEffect read file error.\nfile path:' + binaryData.fsName
      data = toSource2(content)
      this.file = binaryData
    } else {
      data = binaryData
      const f = new File(savePath as string)
      writeFile(f, data)
      this.file = f
    }
    this.name = ''
    this.matchName = ''
    this.reMatchName = /\((Pseudo\/[a-z\s0-9.]+)-/gi
    this.reJSON = /{.*\"controlName\"\s*:\s*\"([^\n\r\"]+)\".*/gi
    this.reXML = /<\s*control name\s*=\s*\"([^\n\r\"]+)\"\s*>(.*)<\s*\/\s*control\s*>/gi
    this.indexArray = []
    const matchMatchName = this.reMatchName.exec(data)
    if (matchMatchName) this.matchName = matchMatchName[1]
    let matchArray = this.reJSON.exec(data)
    if (matchArray) {
      if (matchArray[0].indexOf('{') !== 0) matchArray[0] = '{' + matchArray[0]
      this.name = matchArray[1]
      this.indexArray = eval('(' + matchArray[0] + ')').controlArray
    } else {
      matchArray = this.reXML.exec(data)
      if (matchArray) {
        this.name = matchArray[1]
        this.indexArray = eval('(' + matchArray[2] + ')')
      }
    }
    this.props = {}
    this.textOffset = 0
    this.props = this.getProps(0)
  }
  private getProps(groupIndex: number) {
    const groupProps: AnyObject = {}
    const len = this.indexArray.length
    for (let i = groupIndex; i < len; ++i) {
      const prop = this.indexArray[i]
      if (prop.type === 'group') {
        const newGroup = this.getProps(i + 1)
        newGroup.index = i + 1 + this.textOffset
        newGroup.name = prop.name
        newGroup.invisible = prop.invisible
        i = newGroup.lastIndex
        groupProps[prop.name] = newGroup
      } else if (prop.type === 'endgroup') {
        groupProps.lastIndex = i
        return groupProps
      } else {
        prop.index = i + 1 + this.textOffset
        groupProps[prop.name] = prop
        if (prop.type === 'text') ++this.textOffset
      }
    }
    return groupProps
  }
  public apply(layer: AVLayer) {
    if (!this.file.exists) return null
    const effects = layer.effect
    const canAddProperty = effects.canAddProperty(this.matchName)
    if (!canAddProperty) return null
    const comp = tempComp()
    const s = comp.layers.addShape()
    s.applyPreset(this.file)
    const fx = s.effect(1)
    if (fx) {
      this.matchName = fx.matchName
    }
    s.remove()
    comp.remove()
    const effect = effects.addProperty(this.matchName)
    effect.name = this.name
    return effect
  }
}

export default PseudoEffect
