# class

## EffectExtends

* [参数]

1. layer: AV 图层

* [属性]

1. layer: AV 图层
2. effectGroup: 图层的效果组,`layer.property('ADBE Effect Parade');`

* [方法]

1. addEffect(name:string): 向图层添加一个效果
2. removeEffect(id: string | number): 从图层移除一个效果
3. findEffect(id: string | number): 查找图层中指定 id 的效果

## ParseJSONAsUI

* [参数]

1. UISource: 要解析的 Object 对象

* [静态属性]

1. SPECIAL_PROPERTY: 一个键对象，用来检查一些属性是否是特殊的，比如 `children`。

* [静态方法]

1. addWindow
2. addPanel
3. addGroup
4. addCheckbox
5. addButton
6. addSlider
7. addStaticText
8. addEditText
9. addDropDownList
10. addListBox
11. addTreeView

* [属性]

1. UISource：要解析的 Object 对象

* [方法]

1. InstalledUI

* [私有方法]

1. \_argumentsParser
2. \_propertiesParser
3. \_installedControl
