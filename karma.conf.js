module.exports = config => {
  config.set({
    frameworks: ['jasmine'],

    files: [{ pattern: 'src/assets/**/*.test.js' }],

    preprocessors: {
      'src/assets/**/*.test.js': ['webpack'],
    },

    webpack: require('./webpack.config.dev'),

    reporters: ['dots'],

    browsers: ['ChromeHeadless'],
  })
}
