import { defineConfig } from 'rolldown'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import path from 'node:path'

const hasPro = process.env.NODE_ENV === 'production'

/**@type {import('terser').MinifyOptions} */
let terserConfig = {
  mangle: true,
  compress: {
    passes: 2,
    typeofs: false,
    negate_iife: false,
    hoist_vars: true,
    arrows: false,
    arguments: true,
    booleans: false,
    conditionals: false,
    evaluate: false,
    join_vars: false,
    keep_infinity: true,
    sequences: false,
    toplevel: true,
    loops: true
  },
  format: { braces: true }
}
if (!hasPro) {
  terserConfig = {
    compress: {
      defaults: false,
      join_vars: false,
      typeofs: false,
      negate_iife: false,
      dead_code: true,
      directives: true,
      unused: true
    },
    mangle: false,
    format: {
      indent_level: 2,
      quote_style: 3,
      wrap_func_args: false,
      beautify: true,
      braces: true,
      comments: false,
      keep_quoted_props: true,
      keep_numbers: true,
      wrap_func_args: false,
      semicolons: false
    }
  }
}

export default defineConfig({
  input: 'index.tsx',
  output: {
    format: 'esm',
    esModule: true,
    file: 'dist/main.jsx',
    intro: ';(function(thisObj) {',
    outro: '}(this))'
  },
  plugins: [typescript(), terser(terserConfig)],
  define: {
    undef: 'undefined',
    NORMALIZE: 255,
    MAX_HUE: 360,
    HUE_FACTOR: 60,
    PERCENTAGE_FACTOR: 100
  },
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: hasPro,
    tryCatchDeoptimization: hasPro
  },
  moduleTypes: {
    '.jsxinc': 'jsx',
    '.jsxbin': 'jsx',
    '.res': 'text',
    '.json': 'json',
    '.jgp': 'base64',
    '.png': 'base64',
    '.ffx': 'base64',
    '.aep': 'base64'
  }
})
