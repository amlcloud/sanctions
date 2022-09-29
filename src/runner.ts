const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

import { fetchUK } from "./fetch_uk";
import { dfat_gov_au__consolidated_list } from "./dfat_gov_au__consolidated_list";
import { ec_europa_eu__sanctions_list } from "./ec_europa_eu__sanctions_list";
import { justice_gc_ca__corrupt_foreign_nationals } from "./justice_gc_ca__corrupt_foreign_nationals";
import { pmddtc_state_gov__aeca_dsl } from "./pmddtc_state_gov__aeca_dsl";
import { government_nl__dnslt } from "./government_nl__dnslt";
import { fetchUScsl } from "./fetch_us_csl";
import { occ_gov_enforcement_actions } from "./occ_gov_enforcement_actions";
import { gc_ca__casl } from "./gc_ca__casl";
import { treasury_gov__sdnl } from "./treasury_gov__sdnl";
import { api_trade_gov__csl_consolidated } from "./api_trade_gov__csl_consolidated";
import { fiu_gov_ua__black_list_full } from "./fiu_gov_ua__black_list_full";
import { publicsafety_gc_ca__counter_terrorism_entity } from "./publicsafety_gc_ca__counter_terrorism_entity";

if (argv.au !== undefined) {
  console.log("fetch au list...");
  dfat_gov_au__consolidated_list();
}

if (argv.eu !== undefined) {
  console.log("fetch eu list...");
  ec_europa_eu__sanctions_list();
}

if (argv.usa !== undefined) {
  console.log("fetch usa list...");
  pmddtc_state_gov__aeca_dsl();
}

if (argv.calaw !== undefined) {
  console.log("fetch ca law list...");
  justice_gc_ca__corrupt_foreign_nationals();
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
  government_nl__dnslt();
}

if (argv.easearch !== undefined) {
  console.log("fetch ots enforcement order list ...");
  occ_gov_enforcement_actions();
}
if (argv.ca !== undefined) {
  console.log("fetch ca list...");
  gc_ca__casl();
}

if (argv.usanonsdn !== undefined) {
  console.log("fetch usa non-sdn list...");
  treasury_gov__sdnl();
}

if (argv.usacslapi !== undefined) {
  console.log("fetch usa csl api list...");
  api_trade_gov__csl_consolidated();
}

if (argv.fiuua !== undefined) {
  console.log("fetch ukraine list...");
  fiu_gov_ua__black_list_full();
}

if(argv.cacnt != undefined){
  console.log("fetch canada counter terrorism entity...");
  publicsafety_gc_ca__counter_terrorism_entity();
}