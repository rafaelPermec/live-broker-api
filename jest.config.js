/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './tests',
  testRegex: './*\\.test\\.ts$',
  testTimeout: 30000,
  maxWorkers: 1,
};
