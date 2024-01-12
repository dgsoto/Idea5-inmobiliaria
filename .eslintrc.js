module.exports = {
  overrides: [
    {
      extends: ['standard-with-typescript'],

      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '!**/.eslintrc.js'],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'warn',
        'no-console': 'warn',
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': 'off'
      }
    }
  ]
}
