const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

import { fetchUK } from "./fetch_uk";
import { fetchAU } from "./dfat_gov_au__consolidated_list";
import { fetchEU } from "./ec_europa_eu__sanctions_list";
import { fetchCAlaw } from "./justice_gc_ca__corrupt_foreign_nationals";
import { fetchUSA } from "./pmddtc_state_gov__aeca_dsl";
import { fetchNL } from "./government_nl__dnslt";
import { fetchUScsl } from "./fetch_us_csl";
import { occ_gov__ots_enforcement_order_listing } from "./occ_gov_enforcement_actions";
import { fetchCA } from "./gc_ca__casl";
import { fetchUSA_nonSDN } from "./treasury_gov__sdnl";
import { api_trade_gov__csl_consolidated } from "./api_trade_gov__csl_consolidated";
import { fiu_gov_ua__black_list_full } from "./fiu_gov_ua__black_list_full";

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

if (argv.uscsl !== undefined) {
  console.log(`fetch us csl list...`);
  fetchUScsl();
}
if (argv.che !== undefined) {
  console.log(`fetch che list...`);
  require('../lib/fetch_che').fetchCHE();
}

if (argv.uk !== undefined) {
  console.log("fetch uk list...");
  fetchUK();
}

if (argv.nl !== undefined) {
  console.log("fetch nl list...");
  fetchNL();
}

if (argv.easearch !== undefined) {
  console.log("fetch ots enforcement order list ...");
  occ_gov__ots_enforcement_order_listing();
}
if (argv.ca !== undefined) {
  console.log("fetch ca list...");
  fetchCA();
}

if (argv.usanonsdn !== undefined) {
  console.log("fetch usa non-sdn list...");
  fetchUSA_nonSDN();
}

if (argv.usacslapi !== undefined) {
  console.log("fetch usa csl api list...");
  api_trade_gov__csl_consolidated();
}

if (argv.fiuua !== undefined) {
  console.log("fetch ukraine list...");
  fiu_gov_ua__black_list_full();
}
