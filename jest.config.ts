// import type { Config } from "jest";
// import nextJest from "next/jest.js";

// const createJestConfig = nextJest({
//   dir: "./",
// });

// const config: Config = {
//   coverageProvider: "v8",
//   testEnvironment: "jsdom",
//   transformIgnorePatterns: ["node_modules/(?!(antd)/)"],
//   moduleFileExtensions: ["js", "ts", "jsx", "tsx", "json", "node"],

//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
// };

// export default createJestConfig(config);
import type { Config } from 'jest';
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(antd)/)', // Assurez-vous que antd est transformé
    'node_modules/(?!(antd|msw)/)',
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  preset: "ts-jest",
  rootDir: ".",
   
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)