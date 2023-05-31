module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/src/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
  moduleDirectories: ["node_modules", "src"],
};
