import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/test/*.ts?(x)',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
  coverageReporters: ['text-summary', 'lcov'],
  testPathIgnorePatterns: ['/node_modules'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/test/*.ts'],
  moduleNameMapper: {
    '@user/(.*)': ['<rootDir>/src/$1'],
    '@base/(.*)': ['<rootDir>/../../src/$1'],
  },
};

export default jestConfig;
