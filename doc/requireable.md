# sempliceWatch as a required module

sempliceWatch (as of 1.0.0) also works as a required module. At present, you can only require sempliceWatch in to your project once (as there are static config variables), but you can re-run with new settings for a different application to monitor.

By requiring sempliceWatch, you can extend it's functionality. Below is a simple example of using sempliceWatch in your project:

```js
var sempliceWatch = require('semplice-watch');

sempliceWatch({
  script: 'app.js',
  ext: 'js json'
});

sempliceWatch.on('start', function () {
  console.log('App has started');
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});
```

sempliceWatch will emit a number of [events](https://github.com/remy/sempliceWatch/blob/master/doc/events.md) by default, and when in verbose mode will also emit a `log` event (which matches what the sempliceWatch cli tool echos).

## Arguments

The `sempliceWatch` function takes either an object (that matches the [sempliceWatch config](https://github.com/remy/sempliceWatch#config-files)) or can take a string that matches the arguments that would be used on the command line:

```js
var sempliceWatch = require('sempliceWatch');

sempliceWatch('-e "js json" app.js');
```

## Methods & Properties

The `sempliceWatch` object also has a few methods and properties. Some are exposed to help with tests, but have been listed here for completeness:

### Event handling

This is simply the event emitter bus that exists inside sempliceWatch exposed at the top level module (ie. it's the `events` api):

- `sempliceWatch.on(event, fn)`
- `sempliceWatch.addListener(event, fn)`
- `sempliceWatch.once(event, fn)`
- `sempliceWatch.emit(event)`
- `sempliceWatch.removeAllListeners([event])`

Note: there's no `removeListener` (happy to take a pull request if it's needed).

### Test utilities

- `sempliceWatch.reset()` - reverts sempliceWatch's internal state to a clean slate
- `sempliceWatch.config` - a reference to the internal config sempliceWatch uses
