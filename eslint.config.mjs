import eslint from '@antfu/eslint-config'

export default eslint({
  typescript: true,
  ignores: [
    '**/*.md',
  ],
})
