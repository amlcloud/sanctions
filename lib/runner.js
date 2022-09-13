"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const fetch_uk_1 = require("./fetch_uk");
const fetch_au_1 = require("./fetch_au");
const fetch_eu_1 = require("./fetch_eu");
const fetch_ca_law_1 = require("./fetch_ca_law");
const fetch_usa_1 = require("./fetch_usa");
const fetch_nl_1 = require("./fetch_nl");
const fetch_us_csl_1 = require("./fetch_us_csl");
const occ_gov__ots_enforcement_order_listing_1 = require("./occ_gov__ots_enforcement_order_listing");
const fetch_ca_1 = require("./fetch_ca");
const fetch_usa_non_sdn_1 = require("./fetch_usa_non_sdn");
const api_trade_gov__csl_consolidated_1 = require("./api_trade_gov__csl_consolidated");
const fiu_gov_ua__black_list_full_1 = require("./fiu_gov_ua__black_list_full");
if (argv.au !== undefined) {
    console.log("fetch au list...");
    (0, fetch_au_1.fetchAU)();
}
if (argv.eu !== undefined) {
    console.log("fetch eu list...");
    (0, fetch_eu_1.fetchEU)();
}
if (argv.usa !== undefined) {
    console.log("fetch usa list...");
    (0, fetch_usa_1.fetchUSA)();
}
if (argv.calaw !== undefined) {
    console.log("fetch ca law list...");
    (0, fetch_ca_law_1.fetchCAlaw)();
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
    (0, fetch_nl_1.fetchNL)();
}
if (argv.easearch !== undefined) {
    console.log("fetch ots enforcement order list ...");
    (0, occ_gov__ots_enforcement_order_listing_1.occ_gov__ots_enforcement_order_listing)();
}
if (argv.ca !== undefined) {
    console.log("fetch ca list...");
    (0, fetch_ca_1.fetchCA)();
}
if (argv.usanonsdn !== undefined) {
    console.log("fetch usa non-sdn list...");
    (0, fetch_usa_non_sdn_1.fetchUSA_nonSDN)();
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