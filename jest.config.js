module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!./setup-tests.js',
    '!src/index.js',
  ],
  setupFiles: ['@babel/polyfill'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx}',
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
