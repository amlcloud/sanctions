"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const fetch_uk_1 = require("./fetch_uk");
const dfat_gov_au__consolidated_list_1 = require("./dfat_gov_au__consolidated_list");
const ec_europa_eu__sanctions_list_1 = require("./ec_europa_eu__sanctions_list");
const justice_gc_ca__corrupt_foreign_nationals_1 = require("./justice_gc_ca__corrupt_foreign_nationals");
const pmddtc_state_gov__aeca_dsl_1 = require("./pmddtc_state_gov__aeca_dsl");
const government_nl__dnslt_1 = require("./government_nl__dnslt");
const fetch_us_csl_1 = require("./fetch_us_csl");
const occ_gov_enforcement_actions_1 = require("./occ_gov_enforcement_actions");
const gc_ca__casl_1 = require("./gc_ca__casl");
const treasury_gov__sdnl_1 = require("./treasury_gov__sdnl");
const api_trade_gov__csl_consolidated_1 = require("./api_trade_gov__csl_consolidated");
const fiu_gov_ua__black_list_full_1 = require("./fiu_gov_ua__black_list_full");
if (argv.au !== undefined) {
    console.log("fetch au list...");
    (0, dfat_gov_au__consolidated_list_1.dfat_gov_au__consolidated_list)();
}
if (argv.eu !== undefined) {
    console.log("fetch eu list...");
    (0, ec_europa_eu__sanctions_list_1.ec_europa_eu__sanctions_list)();
}
if (argv.usa !== undefined) {
    console.log("fetch usa list...");
    (0, pmddtc_state_gov__aeca_dsl_1.pmddtc_state_gov__aeca_dsl)();
}
if (argv.calaw !== undefined) {
    console.log("fetch ca law list...");
    (0, justice_gc_ca__corrupt_foreign_nationals_1.justice_gc_ca__corrupt_foreign_nationals)();
}
if (argv.uscsl !== undefined) {
    console.log(`fetch us csl list...`);
    (0, fetch_us_csl_1.fetchUScsl)();
}
if (argv.che !== undefined) {
    console.log(`fetch che list...`);
    require('../lib/fetch_che').fetchCHE();
}
if (argv.uk !== undefined) {
    console.log("fetch uk list...");
    (0, fetch_uk_1.fetchUK)();
}
if (argv.nl !== undefined) {
    console.log("fetch nl list...");
    (0, government_nl__dnslt_1.government_nl__dnslt)();
}
if (argv.easearch !== undefined) {
    console.log("fetch ots enforcement order list ...");
    (0, occ_gov_enforcement_actions_1.occ_gov_enforcement_actions)();
}
if (argv.ca !== undefined) {
    console.log("fetch ca list...");
    (0, gc_ca__casl_1.gc_ca__casl)();
}
if (argv.usanonsdn !== undefined) {
    console.log("fetch usa non-sdn list...");
    (0, treasury_gov__sdnl_1.treasury_gov__sdnl)();
}
if (argv.usacslapi !== undefined) {
    console.log("fetch usa csl api list...");
    (0, api_trade_gov__csl_consolidated_1.api_trade_gov__csl_consolidated)();
}
if (argv.fiuua !== undefined) {
    console.log("fetch ukraine list...");
    (0, fiu_gov_ua__black_list_full_1.fiu_gov_ua__black_list_full)();
}
//# sourceMappingURL=runner.js.map