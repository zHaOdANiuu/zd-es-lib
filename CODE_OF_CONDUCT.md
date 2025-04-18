# 代码行为准则

请认真遵守: 1目1原则,7项2规4禁止

## 目的

为了规范代码的编写,提高代码的可读性|可维护性|可扩展性和可复用性,制定本行为准则

## 原则

- 一致性：遵循本行为准则,可以让代码更加一致|易读|易维护|易扩展和易复用
- 约束力：遵循本行为准则,可以约束代码的编写,避免产生不必要的错误|逻辑混乱|性能问题和安全问题
- 透明性：遵循本行为准则,可以让所有人都能清楚地理解代码的意图,并能方便地跟进代码的变更
- 效率：遵循本行为准则,可以提高代码的开发效率,降低代码的维护成本

## import

1. 尽量不要导入forEach,map等函数,全部用原生的循环来写

## export

1. 用默认导出只能导出`class`和`function`,不允许导出变量
2. `export`只能导出常量和函数表达式

## this

1. 访问全局的 this 时,使用`GLOBAL_THIS`对象
2. 避免使用`this`关键字,使用箭头函数或`bind`方法代替

## var | let | const

1. 优先使用`const`
2. 不能使用`var`,使用`const`或`let`代替

## class

1. 不要写匿名类,使用命名类

## function

1. 打包时必须套一层立即执行函数
2. 函数体内尽量不要使用`eval`或`arguments`对象
3. 辅助函数应该使用箭头函数
4. 回调函数应该使用箭头函数
5. 尽量不要写递归,使用循环或其他迭代方式

## loop

1. 循环优先用while->do while->for
2. 循环体内不要使用`eval`或`arguments`对象
3. 循环条件尽量简化,避免使用`if`语句
4. 循环控制变量应该与循环变量保持一致

## 命名规范

1. 变量名采用驼峰命名法,即首字母小写,后续单词首字母大写,如`userName`|`userAge`
2. 函数名采用驼峰命名法,如`getUserInfo`|`updateUserInfo`
3. 常量名尽量采用全大写,单词间用下划线连接,如`MAX_AGE`|`USER_TYPE_ADMIN`
4. 函数名采用驼峰命名法,如`getUserInfo`|`updateUserInfo`
5. 函数参数采用驼峰命名法,如`userName`|`userAge`
6. 类名采用驼峰命名法,如`UserInfo`|`UserManager`
7. 类属性采用驼峰命名法,如`userName`|`userAge`
8. 类方法采用驼峰命名法,如`getUserInfo`|`updateUserInfo`

## 注释规范

1. 注释内容要简洁明了,避免过多的注释
2. 注释要与代码紧密相关,避免无意义的注释
3. 注释要准确反映代码的意图,避免注释中出现模糊不清的词汇
4. 注释要与代码保持一致,如`//`和`/**/`注释风格要保持一致
5. 注释要与代码保持同步更新,避免注释过时
6. 注释要遵循代码规范,如变量名采用驼峰命名法,函数名采用驼峰命名法,常量名采用全大写,单词间用下划线连接等
7. 尽量写示例,然后用最简单的大白话,告诉别人是干什么的

## 禁止事项

1. 不要使用`with`语句
2. 不要使用`eval`函数,用Function.call代替
3. 尽量不要使用`arguments`对象,用...args代替
4. 尽量不要使用`try-catch`语句,尤其是在循环或者递归函数里
