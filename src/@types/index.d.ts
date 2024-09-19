/// <reference types="./tools.d.ts" />
/// <reference types="types-for-adobe/AfterEffects/23.0" />

declare const aftereffects: any;

declare const globalThis: object | Panel;

declare function alert(message: any, title?: string, errorIcon?: boolean): void;

declare type NonNullable<T> = T & object;

declare type AnyObject = Record<string, any>;

declare type AnyArray = any[];

declare type AnyFunction = (...args: any[]) => any;

declare type ValidType = string | number | boolean | object;

declare type PropertyKey = string | number | symbol;

declare type NormalizeValue = NumberRange<0, 1>;

declare type MonoValue = NumberRange<0, 256>;

declare type RgbValue = [MonoValue, MonoValue, MonoValue];

declare type RgbNormalizeValue = [NormalizeValue, NormalizeValue, NormalizeValue];

declare type ElementType =
      | 'button'
      | 'iconbutton'
      | 'edittext'
      | 'statictext'
      | 'image'
      | 'listbox'
      | 'treeview'
      | 'dropdownlist'
      | 'slider'
      | 'scrollbar'
      | 'checkbox'
      | 'panel'
      | 'group'
      | 'tabbedpanel'
      | 'custombutton'
      | 'customview'
      | 'customboundedvalue';

declare type FileOpenMode = 'r' | 'w' | 'e' | 'a';

declare type FileEncoding = 'UCS-2BE' | 'UCS-2LE' | 'UCS4-BE' | 'UCS-4LE' | 'UTF-8' | 'BINARY';

declare type LayerType = 'Text' | 'Shape' | 'Light' | 'Camera' | 'Solid' | 'Comp' | 'Null' | 'File';

declare type TypeString<T> = T extends object
      ? '[object Object]'
      : T extends any[]
      ? '[object Array]'
      : T extends string
      ? '[object String]'
      : T extends number
      ? '[object Number]'
      : T extends boolean
      ? '[object Boolean]'
      : T extends null
      ? '[object Null]'
      : '[object Undefined]' | string;

declare type CustomBoundedValue = Slider;

declare type CustomButton = Button & IconButton & Checkbox;

declare type CustomView = Image;

declare type ContainerType = Window | Group | Panel | TabbedPanel | Tab;

declare interface ElementMap
{
      button: Button;
      iconbutton: IconButton;
      edittext: EditText;
      statictext: StaticText;
      image: Image;
      listbox: ListBox;
      treeview: TreeView;
      dropdownlist: DropDownList;
      slider: Slider;
      scrollbar: ScrollBar;
      checkbox: Checkbox;
      panel: Panel;
      group: Group;
      tabbedpanel: TabbedPanel;
      custombutton: CustomButton;
      customview: CustomView;
      customboundedvalue: CustomBoundedValue;
}

declare interface Keyframe
{
      property: Property;
      keyTime: number;
      keyValue: any | null;
      keySelected?: boolean | null;
      keyInTemporalEase?: InTemporalEase | null;
      keyOutTemporalEase?: OutTemporalEase | null;
      keyTemporalContinuous?: boolean | null;
      keyTemporalAutoBezier?: boolean | null;
      keyInInterpolationType?: KeyframeInterpolationType | null;
      keyOutInterpolationType?: KeyframeInterpolationType | null;
      keyInSpatialTangent?: InSpatialTangent | null;
      keyOutSpatialTangent?: OutSpatialTangent | null;
      keySpatialAutoBezier?: boolean | null;
      keySpatialContinuous?: boolean | null;
      keyRoving?: boolean | null;
      keyLabel?: number | null;
}

declare interface ArrayLike<T>
{
      readonly [n: number]: T;
      readonly length: number;
}

declare interface AVLayer
{
      readonly source: {
            readonly mainSource: SolidSource | FileSource | PlaceholderSource;
      };
}

declare interface ShapeLayer
{
      readonly Contents: PropertyGroup;
}

declare interface FootageSource
{
      readonly mainSource: SolidSource | FileSource | PlaceholderSource;
}

declare interface XML
{
      appendChild(child: XML): XML & XML[];
      attribute(name: string | number): XML & XML[];
      attributes(): XML & XML[];
      child(name: string | number): XML & XML[];
      children(): XML & XML[];
}

declare interface File
{
      encoding: FileEncoding;
      open(mode: FileOpenMode, type?: string, creator?: string): boolean;
}

declare interface StringConstructor
{
      fromCharCode(...codes: number[]): string;
}

declare interface String
{
      replace(
            searchValue: RegExp,
            replaceValue: (substring: string, ...args: string[]) => void
      ): string;
      split(delimiter: RegExp | string, limit?: number): string[];
}

declare interface RegExp
{
      source: string;
      lastIndex: number;
      global: boolean;
}

declare interface $
{
      unwatch(name: string): void;
      watch(name: string, func: AnyFunction): void;
}

declare interface Error
{
      end: number;
      fileName: string;
      line: number;
      message: string;
      name: number;
      number: number;
      source: string;
      start: number;
}

declare interface _Control
{
      addEventListener(
            eventName:
                  | 'move'
                  | 'moving'
                  | 'mousedown'
                  | 'mouseup'
                  | 'mousemove'
                  | 'mouseover'
                  | 'mouseout'
                  | 'click',
            handler: (Event: MouseEvent) => unknown,
            capturePhase?: boolean
      ): boolean;
      addEventListener(
            eventName: 'enterKey' | 'keydown' | 'keyup',
            handler: (Event: KeyboardEvent) => unknown,
            capturePhase?: boolean
      ): boolean;
      addEventListener(
            eventName: 'change' | 'changing' | 'resize' | 'resizing' | 'show' | 'focus' | 'blur',
            handler: (Event: Event) => unknown,
            capturePhase?: boolean
      ): boolean;
}

declare interface _AddControl
{
      (type: 'customboundedvalue'): CustomBoundedValue;
      (type: 'custombutton'): CustomButton;
      (type: 'customview'): CustomView;
}

declare interface _AddControlPropertiesEditText
{
      /** 原来的scrollable是错误的 */
      scrolling?: boolean;
}

declare interface Image
{
      text: string;
      notify(eventName?: string): void;
}

declare interface ScriptUI
{
      newFont(name: string, style: number, size: number): ScriptUIFont;
}

declare interface Window
{
      update(): void;
}

declare interface ListItem
{
      readonly type: 'item';
      readonly parent: TreeViewNode | TreeView;
      image: File | ScriptUIImage | string;
}

declare interface TreeView
{
      readonly items: (ListItem | TreeViewNode)[];
      readonly children: (ListItem | TreeViewNode)[];
      selection: TreeViewNode | ListItem;
      onDoubleClick(): void;
}

declare interface TreeViewNode extends ListItem
{
      readonly index: number;
      readonly items: (ListItem | TreeViewNode)[];
      readonly type: 'node';
      readonly parent: TreeViewNode | TreeView;
      image: File | ScriptUIImage | string;
      add(type: 'node', text?: string): TreeViewNode;
      add(type: 'item', text?: string): ListItem;
      add(type: 'node' | 'item', text?: string): TreeViewNode | ListItem;
      remove(what: any): void;
      removeAll(): void;
}

declare interface TabbedPanel
{
      remove(what: any): void;
}

declare interface UIEvent
{
      readonly target: AnyObject;
}

declare interface MouseEvent extends UIEvent
{
      altKey: boolean;
      button: number;
      clientX: number;
      clientY: number;
      ctrlKey: boolean;
      detail: number;
      metaKey: boolean;
      relatedTarget: any;
      screenX: number;
      screenY: number;
      shiftKey: boolean;
      type: string;
      getModifierState(keyIdentifier: string): boolean;
      initMouseEvent(
            eventName: string,
            bubble: boolean,
            isCancelable: boolean,
            view: any,
            detail: number,
            screenX: number,
            screenY: number,
            clientX: number,
            clientY: number,
            ctrlKey: boolean,
            altKey: boolean,
            shiftKey: boolean,
            metaKey: boolean,
            button: number,
            relatedTarget?: any
      ): void;
}
