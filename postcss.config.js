module.exports = {
    plugins: [
      require('cssnano')({
        preset: 'default',
      }),
      require('@fullhuman/postcss-purgecss')({
        content: [
          './public/index.html',
          './src/**/*.js',
          './src/**/*.jsx',
        ],
        safelist: ['safelist'], // Add any classes that should not be purged
      }),
    ],
  };
  