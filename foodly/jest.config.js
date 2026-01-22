module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  resolver: 'ts-jest-resolver',
  transformIgnorePatterns: [
    '/node_modules/(?!cheerio|cheerio-select|css-select|dom-serializer|entities|htmlparser2|domelementtype|domhandler|tslib|domutils)',
  ],
};
