module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globalSetup: "<rootDir>/src/__helper__/fakeMongoGlobalSetup.ts",
    globalTeardown: "<rootDir>/src/__helper__/fakeMongoGlobalTeardown.ts",
    setupFilesAfterEnv: [
        "<rootDir>/src/__helper__/fakeMongoUnitTestSetup.ts"
    ]
};
