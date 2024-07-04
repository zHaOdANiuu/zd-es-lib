# zd-es-lib

Hi~ o(_￣ ▽ ￣_)ブ

- [中文文档](https://zhaodaniuu.github.io/zd-es-lib/docs/zh)

- [English Documentation](https://zhaodaniuu.github.io/zd-es-lib/docs/en)

## 介绍

- 这是一个 ExtendScript 的库,里面包含了一些常用的函数.
- 这个库的目的是为了方便开发者开发 After Effects 的脚本.
- 基于 ts 开发,用 webpack 打包.
- 目前这个库还在开发中,欢迎大家提出宝贵意见.

## 使用

tsconfig.json:

```json
{
      "extends": "./node_modules/zd-es-lib/tsconfig.json",
      "compilerOptions": {
            "paths": {
                  "zd-es-lib": ["./node_modules/zd-es-lib/zd.ts"]
            }
      }
}
```

导入:
`import * as _ from 'zd-es-lib';`

## 开发

- [x] webpack > 5.0.0
- [x] typescript > 5.0.0

```
# 安装依赖
npm install

# 开发环境
npm run dev

# 打包
npm run build
```

## 参考

- src/global/JSON.ts => [json2](https://github.com/douglascrockford/JSON-js)
- src/global/atob.ts, src/global/btoa.ts => [base64](https://github.com/davidchambers/Base64.js)
