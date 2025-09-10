import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.spec.ts',
    '**/test/**/*.int-spec.ts',
    '**/test/**/*.e2e-spec.ts',
  ],
  globalSetup: '<rootDir>/test/global_setup.ts',
  globalTeardown: '<rootDir>/test/global_teardown.ts',
  setupFiles: ['<rootDir>/test/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
export default config;
