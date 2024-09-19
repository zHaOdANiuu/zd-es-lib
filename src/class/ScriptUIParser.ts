import forOwn from '../base/forOwn';
import objectPath from '../base/objectPath';
import duffDevice from '../duffDevice';
import { hasOwn, undef } from '../global/const';
import JSON from '../global/JSON';
import { assign } from '../lib/es6';

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

class ScriptUIParser
{
      window: Window;
      private _namespace: AnyObject = { std: {} };
      constructor(src: AnyArray)
      {
            const window =
                  globalThis === $.global
                        ? new Window(this.properties(src))
                        : (globalThis as unknown as Window);
            this.addUI(src[2], window, this._namespace);
            this._namespace.std = {
                  idPointer:    this._namespace.idPointer,
                  classPointer: this._namespace.classPointer
            };
            delete this._namespace.idPointer;
            delete this._namespace.classPointer;
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
                  if (typeof v === 'string')
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
      parseSelectors(tab: Record<`${string | 'std'}::`, AnyObject>, namespace?: AnyObject)
      {
            if (namespace === undef) namespace = this._namespace;
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
            if (namespacePath === undef) namespacePath = 'std';
            duffDevice(
                  objectPath(this._namespace, namespacePath, '::').classPointer[className],
                  (e, i) =>
                  {
                        callback(e as any, i);
                  }
            );
      }
      eachElementById<T extends _Control>(callback: (e: T) => void, namespacePath?: string)
      {
            if (namespacePath === undef) namespacePath = 'std';
            forOwn(objectPath(this._namespace, namespacePath, '::').idPointer, v =>
            {
                  callback(v);
            });
      }
      getElementById(elementId: string, namespacePath?: string): _Control
      {
            if (namespacePath === undef) namespacePath = 'std';
            return objectPath(this._namespace, namespacePath, '::').idPointer[elementId];
      }
      getElementsByClassName(classNames: string, namespacePath?: string): _Control[]
      {
            if (namespacePath === undef) namespacePath = 'std';
            return objectPath(this._namespace, namespacePath, '::').classPointer[classNames];
      }
      getNamespace(namespaceID: string, namespace?: AnyObject)
      {
            if (namespace === undef) namespace = this._namespace;
            const curNamespace = namespace[namespaceID];
            const getElementById = (elementId: string) => curNamespace.idPointer[elementId];
            const getElementsByClassName = (classNames: string) => curNamespace.classPointer[classNames];
            const getNamespace = (_namespaceID: string) => curNamespace[_namespaceID];
            return { getElementById, getElementsByClassName, getNamespace };
      }
}

export default ScriptUIParser;
