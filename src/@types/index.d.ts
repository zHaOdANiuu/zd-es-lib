/// <reference types="types-for-adobe/AfterEffects/23.0"/>

declare type globalThis = typeof Object | Panel;

declare type TypeString<T> = T extends object ? '[object Object]' : T extends any[] ? '[object Array]' : T extends string ? '[object String]' : T extends number ? '[object Number]' : T extends boolean ? '[object Boolean]' : T extends null ? '[object Null]' : '[object Undefined]'

declare type treeViewElement = TreeView | TreeViewNode;

declare type FilterConditionally<Source, Condition> = Pick<
      Source,
      { [K in keyof Source]: Source[K] extends Condition ? K : never }[keyof Source]
>;

declare type UnionKeys<T> = T extends unknown ? keyof T : never;
declare type UnionValues<T, K extends PropertyKey> = T extends Record<K, infer U> ? U : never;
declare type OfUnion<T> = {
      [P in UnionKeys<T>]: UnionValues<T, P>;
};

declare type Zip<
      T extends readonly unknown[],
      U extends readonly unknown[],
      R extends Record<string, unknown> = object
> = CompareLength<T, U> extends true
      ? T extends []
            ? R
            : T extends [infer F1]
            ? U extends [infer F2]
                  ? R & Callback<F1, F2>
                  : never
            : T extends [infer F1, ...infer T1]
            ? U extends [infer F2, ...infer T2]
                  ? Zip<T1, T2, R & Callback<F1, F2>>
                  : never
            : never
      : never;

declare type Mapping<T extends Union, Value extends string> = ToObj<
      Zip<UnionToArray<T>, UnionToArray<Value>>
>;

declare type Required<T> = {
      [P in keyof T]-?: T[P];
};

declare type rgb = [number, number, number];

declare type pos = [number, number];

declare type size = [number, number];

declare type ValidType = string | number | boolean | object;

declare type PropertyKey = string | number | symbol;

declare type Exclude<T, U> = T extends U ? never : T;

declare type Extract<T, U> = T extends U ? T : never;

declare type Omit<T, K extends keyof unknown> = Pick<T, Exclude<keyof T, K>>;

declare type NonNullable<T> = T & object;

declare type Parameters<T extends (...args: unknown) => unknown> = T extends (...args: infer P) => unknown
      ? P
      : never;

declare type ConstructorParameters<T extends abstract new (...args: unknown) => unknown> =
      T extends abstract new (...args: infer P) => unknown ? P : never;

declare type ReturnType<T extends (...args: unknown) => unknown> = T extends (...args: unknown) => infer R
      ? R
      : unknown;

declare type InstanceType<T extends abstract new (...args: unknown) => unknown> = T extends abstract new (
      ...args: unknown
) => infer R
      ? R
      : unknown;

declare type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;

declare type ObjectIterator<TObject, TResult> = (
      value: TObject[keyof TObject],
      key: string,
      collection: TObject
) => TResult;

declare type FileEncoding = 'UCS-2BE' | 'UCS-2LE' | 'UCS4-BE' | 'UCS-4LE' | 'UTF-8' | 'BINARY';

declare type FileOpenMode = 'r' | 'w' | 'e' | 'a';

declare type customBoundedValue = Slider;

declare type customButton = Button & IconButton & Checkbox;

declare type customView = Image & { notify(eventName?: string): void };

declare interface AVLayer
{ readonly source: { readonly mainSource: SolidSource | FileSource | PlaceholderSource } }

declare interface ShapeLayer
{ readonly Contents: PropertyGroup }

declare interface _AddControl
{
      (type: 'customboundedvalue'): customBoundedValue;
      (type: 'custombutton'): customButton;
      (type: 'customview'): customView;
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

declare interface FootageSource
{ readonly mainSource: SolidSource | FileSource | PlaceholderSource }

declare interface TreeView
{ onDoubleClick(): void }

declare interface ArrayLike<T>
{
      readonly [n: number]: T;
      readonly length: number;
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

declare interface _AddControlPropertiesEditText
{
      /** 原来的scrollable是错误的 */
      scrolling?: boolean;
}

declare class MouseEvent extends UIEvent
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
      declare type: string;
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

declare class TreeViewNode
{
      checked: boolean;
      expanded: boolean;
      image: File | ScriptUIImage | string;
      readonly index: number;
      readonly parent: _Control;
      selected: boolean;
      readonly subItems: any[];
      readonly items: ListItem[];
      text: string;
      readonly type: string;
      add(type: 'node' | 'item', text?: string): ListItem;
      remove(what: any): void;
      removeAll(): void;
}
