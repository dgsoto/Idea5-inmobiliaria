/* eslint-disable camelcase */
const common = ['--require-module ts-node/register'];

const SPWebBackend = [
  ...common,
  'tests/apps/SPWeb/backend/features/**/*.feature',
  '--require tests/apps/SPWeb/backend/features/stepDefinitions/*.steps.ts',
].join(' ');

module.exports = {
  default: '--publish-quiet',
  SPWebBackend,
};
