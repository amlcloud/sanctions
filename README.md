# sanctions

### Set up

Install the dependencies using [NPM](https://www.npmjs.com/)

```bash
npm install
```

### Run fetchers

In order to test all fetching functions whether they return an expected list or not:

```bash
npm run cy:test
```

### Note:

make sure the script exists for that runner in package.json, like so:
 "au": "node ./lib/runner.js --au",

# publish sanctions module

To publish sanctions module:

1. Create NPM acccount (https://npmjs.org)
2. Generate npm token from npmjs type as automation token
3. Add NPM_TOKEN as secret token in github (the value should be npm automation token)

make sure the the sanctions module version updated in package.json, like so:
  "version": "updated version"