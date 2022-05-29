module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8 ',
};
