module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!./setupTests.js',
    '!src/index.js',
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '.+\\.(css|svg|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  verbose: false,
}
