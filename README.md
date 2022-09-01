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
