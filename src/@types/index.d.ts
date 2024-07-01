/// <reference types="types-for-adobe/**" />
/// <reference types="types-for-adobe/AfterEffects/23.0" />

type globalThis = Object | Panel;

type treeViewElement = TreeView | TreeViewNode;

type FilterConditionally<Source, Condition> = Pick<
      Source,
      { [K in keyof Source]: Source[K] extends Condition ? K : never }[keyof Source]
>;

type UnionKeys<T> = T extends unknown ? keyof T : never;
type UnionValues<T, K extends PropertyKey> = T extends Record<K, infer U> ? U : never;
type OfUnion<T> = {
      [P in UnionKeys<T>]: UnionValues<T, P>;
};

type Zip<
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

type Mapping<T extends Union, Value extends string> = ToObj<
      Zip<UnionToArray<T>, UnionToArray<Value>>
>;

type Required<T> = {
      [P in keyof T]-?: T[P];
};

type ValidType = string | number | boolean | object;

type PropertyKey = string | number | symbol;

type Exclude<T, U> = T extends U ? never : T;

type Extract<T, U> = T extends U ? T : never;

type Omit<T, K extends keyof unknown> = Pick<T, Exclude<keyof T, K>>;

type NonNullable<T> = T & object;

type Parameters<T extends (...args: unknown) => unknown> = T extends (...args: infer P) => unknown
      ? P
      : never;

type ConstructorParameters<T extends abstract new (...args: unknown) => unknown> =
      T extends abstract new (...args: infer P) => unknown ? P : never;

type ReturnType<T extends (...args: unknown) => unknown> = T extends (...args: unknown) => infer R
      ? R
      : unknown;

type InstanceType<T extends abstract new (...args: unknown) => unknown> = T extends abstract new (
      ...args: unknown
) => infer R
      ? R
      : unknown;

type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;

type ObjectIterator<TObject, TResult> = (
      value: TObject[keyof TObject],
      key: string,
      collection: TObject
) => TResult;

type FileEncoding = 'UCS-2BE' | 'UCS-2LE' | 'UCS4-BE' | 'UCS-4LE' | 'UTF-8' | 'BINARY';

type FileOpenMode = 'r' | 'w' | 'e' | 'a';

type customBoundedValue = Slider;

type customButton = Button & IconButton & Checkbox;

type customView = Image & {
      notify(eventName?: string): void;
};

interface _AddControl
{
      (type: 'customboundedvalue'): customBoundedValue;
      (type: 'customButton'): customButton;
      (type: 'customView'): customView;
}

interface _Control
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

interface TreeView
{
      onDoubleClick(): void;
}

interface ArrayLike<T>
{
      readonly [n: number]: T;
      readonly length: number;
}

interface XML
{
      appendChild(child: XML): XML & XML[];
      attribute(name: string | number): XML & XML[];
      attributes(): XML & XML[];
      child(name: string | number): XML & XML[];
      children(): XML & XML[];
}

interface File
{
      encoding: FileEncoding;
      open(mode: FileOpenMode, type?: string, creator?: string): boolean;
}

interface String
{
      replace(
            searchValue: RegExp,
            replaceValue: (substring: string, ...args: string[]) => void
      ): string;
      split(delimiter: RegExp | string, limit?: number): string[];
}

interface RegExp
{
      source: string;
      lastIndex: number;
      global: boolean;
}

interface Error
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

interface _AddControlPropertiesEditText
{
      /** 原来的scrollable是错误的 */
      scrolling?: boolean;
}

class MouseEvent extends UIEvent
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

class TreeViewNode
{
      checked: boolean;
      expanded: boolean;
      image: File | ScriptUIImage | string;
      readonly index: number;
      readonly parent: _Control;
      selected: boolean;
      readonly subItems: Array<any>;
      readonly items: ListItem[];
      text: string;
      readonly type: string;
      add(type: 'node', text?: string): ListItem;
      add(type: 'item', text?: string): ListItem;
      remove(what: any): void;
      removeAll(): void;
}
