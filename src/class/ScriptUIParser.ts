import { hasOwn, isString, isUndefined } from '../base/const';
import forOwn from '../base/forOwn';
import objectPath from '../base/objectPath';
import { assign } from '../lib/es6';
import JSON from '../global/JSON';
import duffDevice from '../duffDevice';

type ElementProperties<T, U> =
      | (T & { properties: U; id: string; className: string; namespace: string })
      | AnyObject;
interface AddContainer
{
      (
            type: 'window' | 'palette' | 'dialog',
            style?: ElementProperties<Window, _AddControlPropertiesWindow>,
            children?: AnyArray
      ): any;
      (
            type: 'group' | 'tab' | 'tabbedpanel',
            style?: ElementProperties<Group, _AddControlProperties>,
            children?: AnyArray
      ): any;
      (
            type: 'panel',
            style?: ElementProperties<Panel, _AddControlPropertiesPanel>,
            children?: AnyArray
      ): any;
}
interface AddElement
{
      (type: 'treeview', style: ElementProperties<TreeView, _AddControlPropertiesTreeView>): any;
      (type: 'listbox', style: ElementProperties<ListBox, _AddControlPropertiesListBox>): any;
      (
            type: 'dropdownList',
            style: ElementProperties<DropDownList, _AddControlPropertiesDropDownList>
      ): any;
      (type: 'button', style: ElementProperties<Button, _AddControlProperties>): any;
      (type: 'checkbox', style: ElementProperties<Checkbox, _AddControlProperties>): any;
      (type: 'slider', style: ElementProperties<Slider, _AddControlProperties>): any;
      (
            type: 'statictext',
            style: ElementProperties<StaticText, _AddControlPropertiesStaticText>
      ): any;
      (type: 'edittext', style: ElementProperties<EditText, _AddControlPropertiesEditText>): any;
      (type: 'image', style: ElementProperties<Image, _AddControlProperties>): any;
      (
            type: 'customboundedvalue',
            style: ElementProperties<CustomBoundedValue, _AddControlProperties>
      ): any;
      (type: 'custombutton', style: ElementProperties<CustomButton, _AddControlProperties>): any;
      (type: 'customview', style: ElementProperties<CustomView, _AddControlProperties>): any;
}

/**
 * 脚本UI的解析器
 * @example
 * const _ = ScriptUIParser;
 * const document = new _(_.addContainer(
 * 'window',
 * { maximumSize: [ 250, 480 ], properties: { resizeable: true } },
 * [ _.addElement('button', { id: 'btn' }) ]
 * ));
 * const { window } = document;
 * if (globalThis === $.global)
 * {
 *     window.text = 'test';
 *     window.show();
 * }
 * document.getElementById('btn').onClick = function () { alert('1') };
 */
class ScriptUIParser
{
      window: Window;
      private namespace: AnyObject = { std: {} };
      constructor(src: AnyArray)
      {
            const window =
                  globalThis === $.global
                        ? new Window(this.properties(src))
                        : (globalThis as unknown as Window);
            this.addUI(src[2], window, this.namespace);
            this.namespace.std = {
                  idPointer:    this.namespace.idPointer,
                  classPointer: this.namespace.classPointer
            };
            delete this.namespace.idPointer;
            delete this.namespace.classPointer;
            this.window = window;
            if (!src[1].margins) window.margins = 0;
            if (!src[1].spacing) window.spacing = 0;
            if (!src[1].alignChildren) window.alignChildren = [ 'fill', 'fill' ];
            assign(window, src[1]);
      }
      static addContainer: AddContainer = (type, style?, children?) => [ type, style, children ];
      static addElement: AddElement = (type, style) => [ type, style ];
      private properties(v: AnyArray)
      {
            if (!v[1]) return v[0];
            return v[1].properties
                  ? v[0] + '{properties:' + JSON.stringify(v[1].properties) + '}'
                  : v[0];
      }
      private addUI(data: AnyArray, parent: Window | Group | Panel, root: AnyObject)
      {
            if (!data) return;
            duffDevice(data, v =>
            {
                  if (isString(v))
                  {
                        parent.add(v as any);
                        return;
                  }
                  let target = root;
                  const element: any = parent.add(this.properties(v));
                  const meta = v[1];
                  const children = v[2];
                  if (meta)
                  {
                        forOwn(meta, (v2, k) =>
                        {
                              if (k === 'id' || k === 'className' || k === 'namespace') return;
                              element[k] = v2;
                        });
                        const { id, className, namespace } = meta;
                        if (namespace) target = root[namespace] = root[namespace] || {};
                        if (id)
                        {
                              target.idPointer = target.idPointer || {};
                              target.idPointer[id] = element;
                        }
                        else if (className)
                        {
                              target.classPointer = target.classPointer || {};
                              target.classPointer[className] = target.classPointer[className] || [];
                              target.classPointer[className].push(element);
                        }
                  }
                  if (v.length === 3)
                  {
                        if (meta)
                        {
                              if (!meta.margins) element.margins = 0;
                              if (!meta.spacing) element.spacing = 0;
                              if (!meta.alignChildren) element.alignChildren = [ 'fill', 'fill' ];
                        }
                        else
                        {
                              element.margins = element.spacing = 0;
                              element.alignChildren = [ 'fill', 'fill' ];
                        }
                        this.addUI(children, element, target);
                  }
            });
      }
      /**
       * 解析选择器
       * @param tab 选择器表
       * @param namespace? 命名空间,默认为std
       * @example
       * document.parseSelectors({
       *     '#btn': { text: 'abc' },
       * })
       */
      parseSelectors(tab: Record<`${string | 'std'}::`, AnyObject>, namespace?: AnyObject)
      {
            if (isUndefined(namespace)) namespace = this.namespace;
            forOwn(tab, (v, k) =>
            {
                  const _k = k.substr(1);
                  if (k[0] === '#')
                  {
                        if (!hasOwn(namespace.idPointer, _k))
                              throw (
                                    'The id pointer in the namespace does not have a key-value pair named ' +
                                    _k
                              );
                        assign(namespace.idPointer[_k], v);
                  }
                  else if (k[0] === '.')
                  {
                        if (!hasOwn(namespace.classPointer, _k))
                              throw (
                                    'The class pointer in the namespace does not have a key-value pair named ' +
                                    _k
                              );
                        duffDevice(namespace.classPointer[_k], e =>
                        {
                              assign(e as object, v);
                        });
                  }
                  else
                  {
                        const l = k.length - 2;
                        if (k.substring(l) === '::')
                              this.parseSelectors(v, namespace[k.substring(0, l)]);
                        else throw k + ' is an unknown parser symbol';
                  }
            });
      }
      eachElementByClassName<T extends _Control>(
            className: string,
            callback: (e: T, i: number) => void,
            namespacePath?: string
      )
      {
            if (isUndefined(namespacePath)) namespacePath = 'std';
            duffDevice(
                  objectPath(this.namespace, namespacePath, '::').classPointer[className],
                  (e, i) =>
                  {
                        callback(e as any, i);
                  }
            );
      }
      eachElementById<T extends _Control>(callback: (e: T) => void, namespacePath?: string)
      {
            if (isUndefined(namespacePath)) namespacePath = 'std';
            forOwn(objectPath(this.namespace, namespacePath, '::').idPointer, v =>
            {
                  callback(v);
            });
      }
      getElementById(elementId: string, namespacePath?: string): _Control
      {
            if (isUndefined(namespacePath)) namespacePath = 'std';
            return objectPath(this.namespace, namespacePath, '::').idPointer[elementId];
      }
      getElementsByClassName(classNames: string, namespacePath?: string): _Control[]
      {
            if (isUndefined(namespacePath)) namespacePath = 'std';
            return objectPath(this.namespace, namespacePath, '::').classPointer[classNames];
      }
      getNamespace(namespaceID: string, namespace?: AnyObject)
      {
            if (isUndefined(namespace)) namespace = this.namespace;
            const curNamespace = namespace[namespaceID];
            const getElementById = (elementId: string) => curNamespace.idPointer[elementId];
            const getElementsByClassName = (classNames: string) => curNamespace.classPointer[classNames];
            const getNamespace = (id: string) => curNamespace[id];
            return { getElementById, getElementsByClassName, getNamespace };
      }
}

export default ScriptUIParser;
