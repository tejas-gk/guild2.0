/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
   transform: {
     '^.+\\.(ts|tsx)$': 'ts-jest',
   },

  setupFilesAfterEnv: ['./src/jest.setup.ts'],
};