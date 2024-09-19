# zd-es-lib

## 目录

```dir
zd-es-lib
├── dist  // 打包目录
├── docs  // 文档目录
├── src   // 源代码目录
├── test  // 测试目录
├── CHANGELOG.md // 更新日志
├── CODE_OF_CONDUCT.md // 行为准则
├── CONTRIBUTING.md // 贡献指南
├── LICENSE // 许可证
├── README.md // 介绍
└── package.json // 包信息
```

## 安装

```powershell
npm i zd-es-lib
```

## 导入

`import * as _ from 'zd-es-lib';`

* 当导入的时候就会有相应的类型

## 使用

tsconfig.json:

```json
{
      "extends": "./node_modules/zd-es-lib/tsconfig.json",
      "compilerOptions": {
            "baseUrl":".",
            "paths": {
                  "zd-es-lib": ["node_modules/zd-es-lib/index.ts"]
            }
      }
}
```

**注意!!!**
因为脚本的类型声明并不完善,所以我用ts的三斜线语法导入类型,然后更改,如果要使用原本的类型声明,
请在`tsconfig.json`配置里添加`types`并更改为:

```json
"types": ["types-for-adobe/AfterEffects/23.0"]
```

## 代码

* [lib](LIB.md)
* [global](GLOBAL.md)
* [class](CLASS.md)
* [function](FUNCTION.md)
* [event](EVENT.md)
