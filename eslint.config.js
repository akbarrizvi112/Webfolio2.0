import js from '@eslint/js'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'

// NOTE: TypeScript/TSX files are type-checked and linted by `tsc --noEmit`
// (see the `typecheck` script). typescript-eslint does not yet support the
// installed TypeScript 7.0 API, so ESLint here lints the plain JS/MJS config
// files only. Re-add `typescript-eslint` to the `**/*.{ts,tsx}` block once it
// ships TS 7 support (https://github.com/typescript-eslint/typescript-eslint/issues/10940).
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,mjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },
])
