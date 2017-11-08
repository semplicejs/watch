![sempliceWatch logo](http://sempliceWatch.io/sempliceWatch.svg)

# sempliceWatch

<a href="https://app.codesponsor.io/link/wnz2te8CdfKZ8wMjGUpi8EZG/remy/sempliceWatch" rel="nofollow"><img src="https://app.codesponsor.io/embed/wnz2te8CdfKZ8wMjGUpi8EZG/remy/sempliceWatch.svg" style="width: 888px; height: 68px;" alt="Sponsor" /></a>

For use during development of a node.js based application.

sempliceWatch will watch the files in the directory in which sempliceWatch was started, and if any files change, sempliceWatch will automatically restart your node application.

sempliceWatch does **not** require *any* changes to your code or method of development. sempliceWatch simply wraps your node application and keeps an eye on any files that have changed. Remember that sempliceWatch is a replacement wrapper for `node`, think of it as replacing the word "node" on the command line when you run your script.

[![NPM version](https://badge.fury.io/js/sempliceWatch.svg)](https://npmjs.org/package/sempliceWatch)
[![Travis Status](https://travis-ci.org/remy/sempliceWatch.svg?branch=master)](https://travis-ci.org/remy/sempliceWatch)

# Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):

    npm install -g sempliceWatch

And sempliceWatch will be installed globally to your system path.

It is also possible to install locally:

    npm install --save-dev sempliceWatch

With a local installation, sempliceWatch will not be available in your system path. Instead, the local installation of sempliceWatch can be run by calling it from within an npm script (such as `npm start`) or using `npx sempliceWatch`.

# Usage

sempliceWatch wraps your application, so you can pass all the arguments you would normally pass to your app:

    sempliceWatch [your node app]

For CLI options, use the `-h` (or `--help`) argument:

    sempliceWatch -h

Using sempliceWatch is simple, if my application accepted a host and port as the arguments, I would start it as so:

    sempliceWatch ./server.js localhost 8080

Any output from this script is prefixed with `[sempliceWatch]`, otherwise all output from your application, errors included, will be echoed out as expected.

sempliceWatch also supports running and monitoring [coffee-script](http://coffeescript.org/) apps:

    sempliceWatch server.coffee

If no script is given, sempliceWatch will test for a `package.json` file and if found, will run the file associated with the *main* property ([ref](https://github.com/remy/sempliceWatch/issues/14)).

You can also pass the debug flag to node through the command line as you would normally:

    sempliceWatch --debug ./server.js 80

If you have a `package.json` file for your app, you can omit the main script entirely and sempliceWatch will read the `package.json` for the `main` property and use that value as the app.

sempliceWatch will also search for the `scripts.start` property in `package.json` (as of sempliceWatch 1.1.x).

Also check out the [FAQ](https://github.com/remy/sempliceWatch/blob/master/faq.md) or [issues](https://github.com/remy/sempliceWatch/issues) for sempliceWatch.

## Automatic re-running

sempliceWatch was originally written to restart hanging processes such as web servers, but now supports apps that cleanly exit. If your script exits cleanly, sempliceWatch will continue to monitor the directory (or directories) and restart the script if there are any changes.

## Manual restarting

Whilst sempliceWatch is running, if you need to manually restart your application, instead of stopping and restart sempliceWatch, you can simply type `rs` with a carriage return, and sempliceWatch will restart your process.

## Config files

sempliceWatch supports local and global configuration files. These are usually named `sempliceWatch.json` and can be located in the current working directory or in your home directory. An alternative local configuration file can be specified with the `--config <file>` option.

The specificity is as follows, so that a command line argument will always override the config file settings:

- command line arguments
- local config
- global config

A config file can take any of the command line arguments as JSON key values, for example:

    {
      "verbose": true,
      "ignore": ["*.test.js", "fixtures/*"],
      "execMap": {
        "rb": "ruby",
        "pde": "processing --sketch={{pwd}} --run"
      }
    }

The above `sempliceWatch.json` file might be my global config so that I have support for ruby files and processing files, and I can simply run `sempliceWatch demo.pde` and sempliceWatch will automatically know how to run the script even though out of the box support for processing scripts.

A further example of options can be seen in [sample-sempliceWatch.md](https://github.com/remy/sempliceWatch/blob/master/doc/sample-sempliceWatch.md)

### package.json

If you want to keep all your package configurations in one place, sempliceWatch supports using `package.json` for configuration.
Simply specify the config in the same format as you would for a config file but under `sempliceWatchConfig` in the `package.json` file, for example, take the following `package.json`:

    {
      "name": "sempliceWatch",
      "homepage": "http://sempliceWatch.io",
      ...
      ... other standard package.json values
      ...
      "sempliceWatchConfig": {
        "ignore": ["test/*", "docs/*"],
        "delay": "2500"
      }
    }

Note that if you specify a `--config` file or provide a local `sempliceWatch.json` any `package.json` config is ignored.

*This section needs better documentation, but for now you can also see `sempliceWatch --help config` ([also here](https://github.com/remy/sempliceWatch/blob/master/doc/cli/config.txt))*.

## Using sempliceWatch as a module

Please see [doc/requireable.md](doc/requireable.md)

## Running non-node scripts

sempliceWatch can also be used to execute and monitor other programs. sempliceWatch will read the file extension of the script being run and monitor that extension instead of .js if there's no .sempliceWatchignore:

    sempliceWatch --exec "python -v" ./app.py

Now sempliceWatch will run `app.py` with python in verbose mode (note that if you're not passing args to the exec program, you don't need the quotes), and look for new or modified files with the `.py` extension.

### Default executables

Using the `sempliceWatch.json` config file, you can define your own default executables using the `execMap` property. This is particularly useful if you're working with a language that isn't supported by default by sempliceWatch.

To add support for sempliceWatch to know about the .pl extension (for Perl), the sempliceWatch.json file would add:

    {
      "execMap": {
         "pl": "perl"
      }
    }

Now running the following, sempliceWatch will know to use `perl` as the executable:

    sempliceWatch script.pl

It's generally recommended to use the global `sempliceWatch.json` to add your own `execMap` options. However, if there's a common default that's missing, this can be merged in to the project so that sempliceWatch supports it by default, by changing [default.js](https://github.com/remy/sempliceWatch/blob/master/lib/config/defaults.js) and sending a pull request.

## Monitoring multiple directories

By default sempliceWatch monitors the current working directory. If you want to take control of that option, use the `--watch` option to add specific paths:

    sempliceWatch --watch app --watch libs app/server.js

Now sempliceWatch will only restart if there are changes in the `./app` or `./libs` directory. By default sempliceWatch will traverse sub-directories, so there's no need in explicitly including sub-directories.

Don't use unix globbing to pass multiple directories, e.g `--watch ./lib/*`, it won't work. You need a `--watch` flag per directory watched.

## Specifying extension watch list

By default, sempliceWatch looks for files with the `.js`, `.coffee`, `.litcoffee`, and `.json` extensions. If you use the `--exec` option and monitor `app.py` sempliceWatch will monitor files with the extension of `.py`. However, you can specify your own list with the `-e` (or `--ext`) switch like so:

    sempliceWatch -e js,jade

Now sempliceWatch will restart on any changes to files in the directory (or subdirectories) with the extensions .js, .jade.

## Ignoring files

By default, sempliceWatch will only restart when a `.js` JavaScript file changes. In some cases you will want to ignore some specific files, directories or file patterns, to prevent sempliceWatch from prematurely restarting your application.

This can be done via the command line:

    sempliceWatch --ignore lib/ --ignore tests/

Or specific files can be ignored:

    sempliceWatch --ignore lib/app.js

Patterns can also be ignored (but be sure to quote the arguments):

    sempliceWatch --ignore 'lib/*.js'

Note that by default, sempliceWatch will ignore the `.git`, `node_modules`, `bower_components`, `.nyc_output`, `coverage` and `.sass-cache` directories and *add* your ignored patterns to the list. If you want to indeed watch a directory like `node_modules`, you need to [override the underlying default ignore rules](https://github.com/remy/sempliceWatch/blob/master/faq.md#overriding-the-underlying-default-ignore-rules).

## Application isn't restarting

In some networked environments (such as a container running sempliceWatch reading across a mounted drive), you will need to use the `legacyWatch: true` which enables Chokidar's polling.

Via the CLI, use either `--legacy-watch` or `-L` for short:

    sempliceWatch -L

Though this should be a last resort as it will poll every file it can find.

## Delaying restarting

In some situations, you may want to wait until a number of files have changed. The timeout before checking for new file changes is 1 second. If you're uploading a number of files and it's taking some number of seconds, this could cause your app to restart multiple times unnecessarily.

To add an extra throttle, or delay restarting, use the `--delay` command:

    sempliceWatch --delay 10 server.js

For more precision, milliseconds can be specified.  Either as a float:

    sempliceWatch --delay 2.5 server.js

Or using the time specifier (ms):

    sempliceWatch --delay 2500ms server.js

The delay figure is number of seconds (or milliseconds, if specified) to delay before restarting. So sempliceWatch will only restart your app the given number of seconds after the *last* file change.

If you are setting this value in `sempliceWatch.json`, the value will always be interpretted in milliseconds. E.g., the following are equivalent:

    sempliceWatch --delay 2.5

    {
        "delay": "2500"
    }

## Controlling shutdown of your script

sempliceWatch sends a kill signal to your application when it sees a file update. If you need to clean up on shutdown inside your script you can capture the kill signal and handle it yourself.

The following example will listen once for the `SIGUSR2` signal (used by sempliceWatch to restart), run the clean up process and then kill itself for sempliceWatch to continue control:

    process.once('SIGUSR2', function () {
      gracefulShutdown(function () {
        process.kill(process.pid, 'SIGUSR2');
      });
    });

Note that the `process.kill` is *only* called once your shutdown jobs are complete. Hat tip to [Benjie Gillam](http://www.benjiegillam.com/2011/08/node-js-clean-restart-and-faster-development-with-sempliceWatch/) for writing this technique up.

## Triggering events when sempliceWatch state changes

If you want growl like notifications when sempliceWatch restarts or to trigger an action when an event happens, then you can either `require` sempliceWatch or simply add event actions to your `sempliceWatch.json` file.

For example, to trigger a notification on a Mac when sempliceWatch restarts, `sempliceWatch.json` looks like this:

```json
{
  "events": {
    "restart": "osascript -e 'display notification \"app restarted\" with title \"sempliceWatch\"'"
  }
}
```

A full list of available events is listed on the [event states wiki](https://github.com/remy/sempliceWatch/wiki/Events#states). Note that you can bind to both states and messages.

## Pipe output to somewhere else

```js
sempliceWatch({
  script: ...,
  stdout: false // important: this tells sempliceWatch not to output to console
}).on('readable', function() { // the `readable` event indicates that data is ready to pick up
  this.stdout.pipe(fs.createWriteStream('output.txt'));
  this.stderr.pipe(fs.createWriteStream('err.txt'));
});
```

## Using sempliceWatch in your gulp workflow

Check out the [gulp-sempliceWatch](https://github.com/JacksonGariety/gulp-sempliceWatch) plugin to integrate sempliceWatch with the rest of your project's gulp workflow.

## Using sempliceWatch in your Grunt workflow

Check out the [grunt-sempliceWatch](https://github.com/ChrisWren/grunt-sempliceWatch) plugin to integrate sempliceWatch with the rest of your project's grunt workflow.

## Pronunciation

> sempliceWatch, is it pronounced: node-mon, no-demon or node-e-mon (like pokémon)?

Well...I've been asked this many times before. I like that I've been asked this before. There's been bets as to which one it actually is.

The answer is simple, but possibly frustrating. I'm not saying (how I pronounce it). It's up to you to call it as you like. All answers are correct :)

## Design principles

- Less flags is better
- Works across all platforms
- Less features
- Let individuals build on top of sempliceWatch
- Offer all CLI functionality as an API
- Contributions must have and pass tests

sempliceWatch is not perfect, and CLI arguments has sprawled beyond where I'm completely happy, but perhaps it can be pulled back a little.

## FAQ

See the [FAQ](https://github.com/remy/sempliceWatch/blob/master/faq.md) and please add your own questions if you think they would help others.

# License

MIT [http://rem.mit-license.org](http://rem.mit-license.org)
