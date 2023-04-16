/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(spec).ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/dist"],
  transformIgnorePatterns: ["^.+\\.js$", "node_modules"],
  setupFilesAfterEnv: ["<rootDir>/jest/setupFilesAfterEnv.ts"],
  setupFiles: ["<rootDir>/jest/setupFiles.ts"],
  modulePaths: ["<rootDir>/jest/factories"],
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  globals: {
    "ts-jest": {
      compiler: "ttypescript",
    },
  },
  fakeTimers: {
    enableGlobally: true,
  },
};
