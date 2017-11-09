# sempliceWatch code arch

```
CLI -> parser -> sempliceWatch options -> rules

rules -> configure -> watch -> start process
```

## CLI examples

Watch src but only *.js and *.coffee

    sempliceWatch --watch src/ -e js,coffee app.js

Parsed to:

    {
      watch: ['src/'],
      ignore: [],
      script: 'app.js'
      options: {
        extensions: ['js', 'coffee'],
        exec: 'node'
      }
    }

Watch with no args:

    sempliceWatch

Parsed to (assuming a package.json or index.js is found):

    {
      watch: [], // meaning all subdirectories
      ignore: [],
      script: 'index.js',
      options: {
        extensions: ['js'],
        exec: 'node'
      }
    }