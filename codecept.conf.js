// eslint-disable-next-line import/newline-after-import
const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

exports.config = {
  tests: 'e2e/**/*.test.js',
  output: 'e2e/output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost:8080',
      // eslint-disable-next-line no-unneeded-ternary
      show: true, // Use environment variable for headless mode
    },
  },
  include: {
    I: './steps_file.js',
  },
  name: 'Katalog Restorant + PWA',
};
