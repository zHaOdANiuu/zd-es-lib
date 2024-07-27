import { hasOwn } from '../global/const';

class ParseJSONAsUI
{
      static SPECIAL_PROPERTY: Record<string, boolean> = {
            type:       true,
            children:   true,
            properties: true
      };
      public UISource: Record<string, any>;
      constructor(UISource: Record<string, unknown>)
      {
            this.UISource = UISource;
      }
      static addWindow(
            type: 'dialog' | 'palette' | 'window',
            style?: Panel | { properties?: _AddControlPropertiesWindow } | Record<string, any>,
            children?: Record<string, any>
      )
      {
            let result: Panel | Window;
            if (style) result = (style as any); else result = {} as Panel | Window;
            (result as any).type = type;
            result.margins = result.margins || 0;
            result.spacing = result.spacing || 0;
            result.alignChildren = result.alignChildren || [ 'fill', 'fill' ];
            (result as any).children = children;
            return result as Record<string, any>;
      }
      static addPanel(
            orientation?: _Orientation,
            style?: Panel | { properties?: _AddControlPropertiesPanel } | Record<string, any>,
            children?: Record<string, any>
      )
      {
            let result: Panel;
            if (style) result = (style as any); else result = {} as Panel;
            (result as any).type = 'panel';
            if (orientation) result.orientation = orientation;
            result.margins = result.margins || 0;
            result.spacing = result.spacing || 0;
            result.alignChildren = result.alignChildren || [ 'fill', 'fill' ];
            (result as any).children = children;
            return result as Record<string, any>;
      }
      static addGroup(
            orientation?: _Orientation,
            style?: Group | Record<string, any>,
            children?: Record<string, any>
      )
      {
            let result: Panel;
            if (style) result = (style as any); else result = {} as Panel;
            (result as any).type = 'group';
            if (orientation) result.orientation = orientation;
            result.margins = result.margins || 0;
            result.spacing = result.spacing || 0;
            result.alignChildren = result.alignChildren || [ 'fill', 'fill' ];
            (result as any).children = children;
            return result as Record<string, any>;
      }
      static addCheckbox(
            alignment?: _AlignmentProperty,
            style?: Checkbox
      )
      {
            let result: Checkbox;
            if (style) result = (style as any); else result = {} as Checkbox;
            (result as any).type = 'checkbox';
            if (alignment) result.alignment = alignment;
            return result as Record<string, any>;
      }
      static addButton(
            alignment?: _AlignmentProperty,
            style?: Button | Record<string, any>
      )
      {
            let result: Button;
            if (style) result = (style as any); else result = {} as Button;
            (result as any).type = 'button';
            if (alignment) result.alignment = alignment;
            return result as Record<string, any>;
      }
      static addSlider(
            alignment?: _AlignmentProperty,
            style?: Slider
      )
      {
            let result: Slider;
            if (style) result = (style as any); else result = {} as Slider;
            (result as any).type = 'slider';
            if (alignment) result.alignment = alignment;
            return result as Record<string, any>;
      }
      static addStaticText(
            text?: string,
            alignment?: _AlignmentProperty,
            style?: StaticText
      )
      {
            let result: StaticText;
            if (style) result = (style as any); else result = {} as StaticText;
            (result as any).type = 'statictext';
            if (text) result.text = text;
            if (alignment) result.alignment = alignment;
            return result as Record<string, any>;
      }
      static addEditText(
            text?: string,
            alignment?: _AlignmentProperty,
            style?: EditText | { properties?: _AddControlPropertiesEditText }
      )
      {
            let result: EditText;
            if (style) result = (style as any); else result = {} as EditText;
            (result as any).type = 'edittext';
            if (text) result.text = text;
            if (alignment) result.alignment = alignment;
            return result as Record<string, any>;
      }
      static addDropDownList(
            alignment?: _AlignmentProperty,
            style?: DropDownList | { properties?: _AddControlPropertiesDropDownList }
      )
      {
            let result: DropDownList;
            if (style) result = (style as any); else result = {} as DropDownList;
            (result as any).type = 'dropdownlist';
            if (alignment) result.alignment = alignment;
            return result as Record<string, any>;
      }
      static addListBox(
            alignment?: _AlignmentProperty,
            style?: ListBox | { properties?: _AddControlPropertiesListBox } | Record<string, any>
      )
      {
            let result: ListBox;
            if (style) result = (style as any); else result = {} as ListBox;
            (result as any).type = 'listbox';
            result.alignment = alignment as _AlignmentProperty;
            return result as Record<string, any>;
      }
      static addTreeView(
            alignment?: _AlignmentProperty,
            style?: TreeView | { properties?: _AddControlPropertiesTreeView }
      )
      {
            let result: TreeView;
            if (style) result = (style as any); else result = {} as TreeView;
            (result as any).type = 'treeview';
            if (alignment) result.alignment = alignment;
            return result as Record<string, any>;
      }
      static addImage(
            image?: ScriptUIImage,
            alignment?: _AlignmentProperty,
            style?: Image | { properties?: _AddControlProperties }
      )
      {
            let result: Image;
            if (style) result = (style as any); else result = {} as Image;
            (result as any).type = 'image';
            if (image) result.image = image;
            if (alignment) result.alignment = alignment;
            return result as Record<string, any>;
      }
      public InstalledUI(globalThis?: globalThis): Window | Panel
      {
            const newType = this._propertiesParser(this.UISource);
            const WINDOW: any = globalThis instanceof Panel ? globalThis : new Window(newType);
            for (const k in this.UISource)
                  if (hasOwn(this.UISource, k) && !ParseJSONAsUI.SPECIAL_PROPERTY[k])
                        WINDOW[k] = this.UISource[k];
            this._installedControl(this.UISource.children, WINDOW);
            WINDOW.layout.layout(true);
            WINDOW.layout.resize();
            return WINDOW as Window | Panel;
      }
      private _argumentsParser(value: any): string
      {
            const result: string[] = [];
            const length = value.length;
            if (typeof value === 'object')
            {
                  for (let i = -1; ++i < length;) result.push('"' + this._argumentsParser(value[i]) + '"');
                  return '[' + result.toString() + ']';
            }
            return value;
      }
      private _propertiesParser(value: any)
      {
            if (!value.properties) return value.type;
            let str = '';
            for (const k in value.properties)
                  if (hasOwn(value.properties, k))
                        str += k + ':' + this._argumentsParser(value.properties[k]) + ',';
            return value.type + '{properties:{' + str + '}}';
      }
      private _installedControl(children: Record<string, any>, parent: Window | Panel | Group): void
      {
            for (const k in children)
            {
                  if (!hasOwn(children, k)) continue;
                  const newType = this._propertiesParser(children[k]);
                  const ELEMENT = (parent as any)[k] = parent.add(newType) as any;
                  if (children[k].children) this._installedControl(children[k].children, ELEMENT as Group | Panel);
                  for (const j in children[k])
                        if (hasOwn(children[k], j) && !ParseJSONAsUI.SPECIAL_PROPERTY[j])
                              ELEMENT[j] = children[k][j];
            }
      }
}

export default ParseJSONAsUI;
