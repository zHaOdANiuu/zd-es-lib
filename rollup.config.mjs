import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

// 'src/@types/auto-import.d.ts'
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
      input:  'tests/index.ts',
      output: {
            file:  'dist/main.js',
            intro: '(function(globalThis){',
            outro: '}(this));'
      },
      plugins: [
            typescript(),
            terser({
                  compress: false,
                  mangle:   false,
                  format:   {
                        beautify:          true,
                        braces:            true,
                        comments:          false,
                        keep_quoted_props: true,
                        keep_numbers:      true,
                        wrap_func_args:    false
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
            propertyReadSideEffects:  false,
            unknownGlobalSideEffects: false
      },
      logLevel: 'silent',
      context:  'this'
};
