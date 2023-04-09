module.exports = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/lib/(.*)$': '<rootDir>/lib/$1',
        '^@/styles/(.*)$': '<rootDir>/styles/$1',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': [
            'babel-jest',
            {
                presets: ['next/babel'],
            },
        ],
    },
};
