import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
      input: 'index.ts',
      output: {
            file: 'dist/main.jsx',
            intro: '(function(globalThis){$.gc();$.level = 1;$.flags = 256;',
            outro: '}(this));'
      },
      plugins: [
            typescript(),
            terser({
                  compress: false,
                  mangle: false,
                  format: {
                        beautify: true,
                        braces: true,
                        comments: false,
                        keep_quoted_props: true,
                        keep_numbers: true,
                        wrap_func_args: false
                  }
                  // compress: {
                  //       arrows:        false,
                  //       arguments:     true,
                  //       booleans:      false,
                  //       conditionals:  false,
                  //       evaluate:      false,
                  //       join_vars:     false,
                  //       keep_infinity: true,
                  //       sequences:     false,
                  //       toplevel:      true
                  // },
                  // format: { braces: true }
            })
      ],
      treeshake: {
            propertyReadSideEffects: false,
            unknownGlobalSideEffects: false
      },
      logLevel: 'silent',
      context: 'this'
};
