
const assert = require('assert');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

if (argv.au !== undefined) {
  console.log(`fetch au list...`);
  require('../lib/fetch_au').fetchAU();
}
if (argv.eu !== undefined) {
  console.log(`fetch eu list...`);
  require('../lib/fetch_eu').fetchEU();
}
if (argv.usa !== undefined) {
  console.log(`fetch usa list...`);
  require('../lib/fetch_usa').fetchUSA();
}



