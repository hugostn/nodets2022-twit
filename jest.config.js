module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    __TESTING__: true,
  },
  globalSetup: './__tests__/global-setup.ts',
  globalTeardown: './__tests__/global-teardown.ts',
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/',
    'setup.ts',
    'global-setup.ts',
    'global-teardown.ts',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8 ',
};
