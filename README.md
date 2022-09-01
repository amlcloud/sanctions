# sanctions


To test individual fetcher run this command:

npm run au

make sure the script exists for that runner in package.json, like so:
 "au": "node ./lib/runner.js --au",

# publish sanctions module

To publish sanctions module:

1. Create NPM acccount (https://npmjs.org)
2. To login NPM account run this command on Command Line Interface:
    npm login
3. To publish Sanctions package run this command:
    npm publish

make sure the the sanctions module version updated in package.json, like so:
  "version": "updated version"