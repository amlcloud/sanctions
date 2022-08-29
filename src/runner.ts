
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
if (argv.calaw !== undefined) {
  console.log(`fetch ca law list...`);
  require('../lib/fetch_ca_law').fetchCAlaw();
}
if (argv.uscsl !== undefined) {
  console.log(`fetch us csl list...`);
  require('../lib/fetch_us_csl').fetchUScsl();
}
if (argv.che !== undefined) {
  console.log(`fetch che list...`);
  require('../lib/fetch_che').fetchCHE();
}

