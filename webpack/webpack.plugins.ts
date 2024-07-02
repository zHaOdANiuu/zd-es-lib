import { Compiler } from 'webpack';
import { ConcatSource, Source } from 'webpack-sources';
/** 解决 ae 脚本用 webpack 打包完以后是个立即执行函数,从而获得不到全局的 this */
class WebpackGlobalThis
{
      apply(compiler: Compiler)
      {
            compiler.hooks.compilation.tap('_ConcatSource', (compilation) =>
            {
                  compilation.hooks.processAssets.tap('_ConcatSource', (assets) =>
                  {
                        Object.entries(assets).forEach(([ pathname, source ]) =>
                        {
                              const newSource = new ConcatSource(';(function(globalThis){', source as Source, '}(this))');
                              if (newSource.sourceAndMap().map === null) (assets[pathname] as ConcatSource) = newSource;
                        });
                  });
            });
      }
}

export default WebpackGlobalThis;
 
