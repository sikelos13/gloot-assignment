const {defaults} = require('jest-config');

module.exports = {
    "preset": "ts-jest",
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "transform": {
        "^.+\\.js$": "babel-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    // "moduleFileExtensions": [...defaults.moduleFileExtensions, 'conf'],
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "setupFilesAfterEnv": ["./src/setupTests.ts"],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
      ],
      "transformIgnorePatterns": [
        "<rootDir>/node_modules/(?!lodash-es)"
      ]
  }