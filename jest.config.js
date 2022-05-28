module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',

  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8 ',
};
