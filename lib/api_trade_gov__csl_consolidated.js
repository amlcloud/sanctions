"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api_trade_gov__csl_consolidated = void 0;
const nodeFetch = require("node-fetch");
const API_URL = "https://api.trade.gov/static/consolidated_screening_list/consolidated.json";
async function api_trade_gov__csl_consolidated() {
    const response = await nodeFetch(API_URL);
    // API response
    const jsonResponse = await response.text();
    //Parsing jsonValues
    const jsonValues = JSON.parse(jsonResponse);
    let res = [];
    jsonValues.results.forEach((item) => res.push(item));
    return Promise.resolve(res);
}
exports.api_trade_gov__csl_consolidated = api_trade_gov__csl_consolidated;
//# sourceMappingURL=api_trade_gov__csl_consolidated.js.map