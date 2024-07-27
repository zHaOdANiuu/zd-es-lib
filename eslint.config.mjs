import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import stylisticJs from '@stylistic/eslint-plugin-js';

const tsStylistic = {
      '@stylistic/ts/block-spacing':           2,
      '@stylistic/ts/brace-style':             [ 2, 'allman', { allowSingleLine: true } ],
      '@stylistic/ts/comma-dangle':            [ 1, 'never' ],
      '@stylistic/ts/comma-spacing':           [ 2, { before: false, after: true } ],
      '@stylistic/ts/function-call-spacing':   [ 2, 'never' ],
      '@stylistic/ts/type-annotation-spacing': 2,
      '@stylistic/ts/member-delimiter-style':  2,
      '@stylistic/ts/object-curly-spacing':    [ 2, 'always' ],
      '@stylistic/ts/keyword-spacing':         [ 1, { before: true } ],
      '@stylistic/ts/space-infix-ops':         2
};
const jsStylistic = {
      '@stylistic/js/indent': [
            1,
            6,
            {
                  SwitchCase:             1,
                  VariableDeclarator:     { var: 2, let: 2, const: 3 },
                  FunctionExpression:     { body: 1, parameters: 1 },
                  flatTernaryExpressions: true,
                  ignoreComments:         true
            }
      ],
      '@stylistic/js/array-bracket-newline':          [ 1, { multiline: true } ],
      '@stylistic/js/array-bracket-spacing':          [ 1, 'always' ],
      '@stylistic/js/array-element-newline':          [ 1, 'consistent' ],
      '@stylistic/js/arrow-spacing':                  1,
      '@stylistic/js/block-spacing':                  2,
      '@stylistic/js/brace-style':                    [ 2, 'allman', { allowSingleLine: true } ],
      '@stylistic/js/comma-dangle':                   [ 1, 'never' ],
      '@stylistic/js/comma-spacing':                  [ 2, { before: false, after: true } ],
      '@stylistic/js/comma-style':                    [ 1, 'last' ],
      '@stylistic/js/computed-property-spacing':      [ 2, 'never', { enforceForClassMembers: true } ],
      '@stylistic/js/dot-location':                   [ 1, 'property' ],
      '@stylistic/js/eol-last':                       [ 1, 'always' ],
      '@stylistic/js/function-call-spacing':          [ 2, 'never' ],
      '@stylistic/js/function-call-argument-newline': [ 1, 'consistent' ],
      '@stylistic/js/function-paren-newline':         [ 1, 'multiline' ],
      '@stylistic/js/implicit-arrow-linebreak':       [ 1, 'beside' ],
      '@stylistic/js/key-spacing':                    [ 1, { align: 'value' } ],
      '@stylistic/js/keyword-spacing':                [ 1, { before: true } ],
      '@stylistic/js/line-comment-position':          [ 1, { position: 'above' } ],
      '@stylistic/js/new-parens':                     1,
      '@stylistic/js/no-extra-parens':                [ 1, 'all', { returnAssign: false } ],
      '@stylistic/js/no-extra-semi':                  1,
      '@stylistic/js/no-mixed-spaces-and-tabs':       1,
      '@stylistic/js/no-multiple-empty-lines':        [ 1, { max: 1, maxEOF: 0 } ],
      '@stylistic/js/no-multi-spaces':                2,
      '@stylistic/js/no-trailing-spaces':             [ 1, { skipBlankLines: true } ],
      '@stylistic/js/object-curly-newline':           [ 1, { multiline: true } ],
      '@stylistic/js/object-curly-spacing':           [ 2, 'always' ],
      '@stylistic/js/padded-blocks':                  [ 1, 'never' ],
      '@stylistic/js/quotes':                         [ 1, 'single' ],
      '@stylistic/js/quote-props':                    [ 1, 'consistent-as-needed' ],
      '@stylistic/js/semi':                           2,
      '@stylistic/js/semi-spacing':                   1,
      '@stylistic/js/space-in-parens':                [ 1, 'never' ],
      '@stylistic/js/space-before-function-paren':    [ 1, 'never' ],
      '@stylistic/js/spaced-comment':                 [ 1, 'always', { exceptions: [ '-', '*' ] } ],
      '@stylistic/js/switch-colon-spacing':           2,
      '@stylistic/js/space-infix-ops':                1,
      '@stylistic/js/template-curly-spacing':         2,
      '@stylistic/js/wrap-iife':                      [ 1, 'outside' ],
      '@stylistic/js/wrap-regex':                     1
};
const baseRules = {
      'block-scoped-var':                                 2,
      'dot-notation':                                     2,
      'eqeqeq':                                           2,
      'func-name-matching':                               2,
      'guard-for-in':                                     0,
      'max-depth':                                        [ 2, 3 ],
      'no-cond-assign':                                   0,
      'no-loop-func':                                     2,
      'no-shadow':                                        2,
      'no-useless-return':                                2,
      'no-var':                                           2,
      'prefer-rest-params':                               0,
      'prefer-const':                                     2,
      '@typescript-eslint/no-unused-vars':                0,
      '@typescript-eslint/no-explicit-any':               0,
      '@typescript-eslint/no-empty-function':             0,
      '@typescript-eslint/no-dynamic-delete':             0,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/no-invalid-void-type':          0
};
const rules = { 'no-trailing-spaces': 1 };
Object.assign(
      rules,
      tsStylistic,
      jsStylistic,
      baseRules
);

export default [
      ...tseslint.configs.strict.map(conf => ({
            ...conf,
            files: [ '**/*.ts' ]
      })),
      ...tseslint.configs.stylistic.map(conf => ({
            ...conf,
            files: [ '**/*.ts' ]
      })),
      {
            ...pluginJs.configs.recommended,
            rules,
            files:           [ '**/*.ts', '*.mjs' ],
            plugins:         { '@stylistic/js': stylisticJs, '@stylistic/ts': stylisticTs },
            languageOptions: {
                  ecmaVersion: 2021,
                  globals:     globals.es2015
            }
      }
];
