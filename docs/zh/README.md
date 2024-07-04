# 目录

```
zd-es-lib
├── build // 构建相关
│ ├── export.js // node脚本,用于导出模块
├── dist
│ ├── main.js // 打包后的 js 文件
├── src
│ ├── @types // 类型文件夹
│ ├── class // 类文件夹
│ ├── event // 事件文件夹
│ ├── global // 全局变量文件夹
│ ├── lib // es5-es8 兼容库文件夹
├── index.ts // 入口文件
├── zd.ts // 所有函数的导出
└── webpack // webpack 配置
```

# 约定

- 所有函数都应该使用驼峰命名法,如`getHtml`, `setCookie`, `showAlert`等.
- 所有类都应该使用大驼峰命名法,如`MyClass`, `YourClass`等.
- 所有变量都应该使用小驼峰命名法,如`myVariable`, `yourVariable`等.
- 类的导出不应该用`export default`,而应该用 `export` 关键字.

# [class](CLASS.md)

# [event](EVENT.md)

# [global](GLOBAL.md)

# [lib](LIB.md)

# [function](FUNCTION.md)

# globalThis

- 因为 ae 的全局 this 指向是分环境的,所以需要一个约定.
- 在开发 ae 脚本的时候,要用立即执行函数包起来,不然会造成环境污染.
- 请遵守以下规则:
     - 代码的整体格式应该为: `;(function(globalThis){/** ...*/}(this))`
     - 在全局环境下,应该使用`globalThis`来代替`this`.
