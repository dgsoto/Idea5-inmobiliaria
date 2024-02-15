/* eslint-disable camelcase */
const common = ['--require-module ts-node/register'];

const frontofficeBackend = [
  ...common,
  'test/FrontofficeBackend/app/features/**/*.feature',
  '--require test/FrontofficeBackend/app/features/stepDefinitions/*.steps.ts',
].join(' ');

module.exports = {
  default: '--publish-quiet',
  frontofficeBackend,
};
