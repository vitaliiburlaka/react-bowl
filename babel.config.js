const isEnvProduction = process.env.NODE_ENV === 'production'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Allow importing core-js where it needed and use browserlist to select polyfills
        useBuiltIns: 'usage',
        corejs: 3,
        // Do not transform modules to CJS
        modules: false,
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    !isEnvProduction && 'react-hot-loader/babel',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ].filter(Boolean),
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types'],
    },
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
}
