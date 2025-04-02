/// <reference types="./tools.d.ts" />

declare type SourceRect = [left: number, top: number, width: number, height: number] | number[]

declare type PNGString = `\u0089PNG\r\n\x1A\n${string}`

declare type HexColorString = `#${string}`

declare type NonNullable<T> = T & object

declare type AnyObject = Record<string, any>

declare type AnyArray = any[]

declare type AnyFunction = (...args: any[]) => any

declare type ValidType = string | number | boolean | object

declare type PropertyKey = string | number | symbol

declare type NormalizeValue = NumberRange<0, 1>

declare type RgbValue = [int, int, int]

declare type RgbNormalizeValue = [NormalizeValue, NormalizeValue, NormalizeValue]

declare interface TreeViewNode extends ListItem {
  readonly index: number
  readonly items: (ListItem | TreeViewNode)[]
  readonly type: 'node'
  readonly parent: TreeViewNode | TreeView
  image: File | ScriptUIImage | string
  add(type: 'node', text?: string): TreeViewNode
  add(type: 'item', text?: string): ListItem
  add(type: 'node' | 'item', text?: string): TreeViewNode | ListItem
  remove(what: any): void
  removeAll(): void
}
