var ignoreRoot = require('ignore-by-default').directories()

// default options for config.options
module.exports = {
  restartable: 'rs',
  colours: true,
  execMap: {
    py: 'python',
    rb: 'ruby',
    // more can be added here such as ls: lsc - but please ensure it's cross
    // compatible with linux, mac and windows, or make the default.js
    // dynamically append the `.cmd` for node based utilities
  },
  ignoreRoot: ignoreRoot,
  watch: ['*.*'],
  stdin: true,
  runOnChangeOnly: false,
  verbose: false,
  // 'stdout' refers to the default behaviour of a required sempliceWatch's child,
  // but also includes stderr. If this is false, data is still dispatched via
  // sempliceWatch.on('stdout/stderr')
  stdout: true,

};
