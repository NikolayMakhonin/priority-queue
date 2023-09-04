'use strict'

module.exports = {
  require: [
    'tsconfig-paths/register',
    'ts-node/register',
    '@flemist/test-utils/register',
  ],
  'watch-files': ['./src/**'],
  ignore       : ['./**/*.d.ts', '**/trash/**'],
  'node-option': [
    // 'prof',
  ],
}
