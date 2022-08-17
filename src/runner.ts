
const assert = require('assert');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

if (argv.au !== undefined) {
  console.log(`fetch au list...`);
  require('../lib/fetch_au').fetchAU();
}

if (argv.ca !== undefined) {
  console.log(`fetch ca list...`);
  require('../lib/fetch_ca').fetchCA();
}

if (argv.sdn !== undefined) {
  console.log(`fetch sdn list...`);
  require('../lib/fetch_sdn').fetchSDN();
}

