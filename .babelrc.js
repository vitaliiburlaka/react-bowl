// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      '@babel/typescript',
      ['@babel/preset-react', {
        'runtime': 'automatic'
      }],
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    ].filter(Boolean),
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
          '@babel/typescript',
          ['@babel/preset-react', {
            'runtime': 'automatic'
          }]
        ],
      },
    },
  }
}
