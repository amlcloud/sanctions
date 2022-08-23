const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

import { fetchUK } from "./fetch_uk";
import { fetchAU } from "./fetch_au";
import { fetchEU } from "./fetch_eu";
import { fetchCAlaw } from "./fetch_ca_law";
import { fetchUSA } from "./fetch_usa";
import { fetchNL } from "./fetch_nl";

if (argv.au !== undefined) {
  console.log("fetch au list...");
  fetchAU();
}

if (argv.eu !== undefined) {
  console.log("fetch eu list...");
  fetchEU();
}

if (argv.usa !== undefined) {
  console.log("fetch usa list...");
  fetchUSA();
}

if (argv.calaw !== undefined) {
  console.log("fetch ca law list...");
  fetchCAlaw();
}

if (argv.uk !== undefined) {
  console.log("fetch uk list...");
  fetchUK();
}

if (argv.nl !== undefined) {
  console.log("fetch nl list...");
  fetchNL();
}
