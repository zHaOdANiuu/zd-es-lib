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
│ ├── zd.ts // 所有函数的导出
├── index.ts // 入口文件
└── webpack // webpack 配置
```

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
