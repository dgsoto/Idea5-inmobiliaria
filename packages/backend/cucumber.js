/* eslint-disable camelcase */
const common = ['--require-module ts-node/register'];

const Backend = [...common, 'test/app/features/**/*.feature', '--require test/app/features/stepDefinitions/*.steps.ts'].join(' ');

module.exports = {
  default: '--publish-quiet',
  Backend,
};
