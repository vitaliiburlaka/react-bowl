const isEnvProduction = process.env.NODE_ENV === 'production'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
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
