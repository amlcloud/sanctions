"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUScsl = void 0;
var nodeFetch = require("node-fetch");
const node_crypto_1 = require("node:crypto");
async function fetchUScsl() {
    // some configs
    const API_URL = "https://data.trade.gov/consolidated_screening_list/v1/sources";
    const API_KEY = "4dab605cb8754fc3bbe9f191a3a8d4bf";
    // Make the API Call
    const response = await nodeFetch(API_URL, {
        method: "GET",
        headers: new nodeFetch.Headers({
            "subscription-key": API_KEY,
        }),
    });
    // get the data
    const text = await response.text();
    const responseJson = JSON.parse(text);
    const data = responseJson?.response?.ZPROCSUPP || [];
    console.log(`items found: ${data.length}`);
    console.log(text);
    // Generate the hash in the list document
    const hash = (0, node_crypto_1.createHash)("md5").update(text).digest("hex");
    console.log(`fetched list document with hash: ${hash}`);
    let res = [];
    // update docs in the batch
    // const batches: Array<Array<any>> = [[]];
    await data.forEach((item) => {
        res.push(item);
    });
    return res;
}
exports.fetchUScsl = fetchUScsl;
//# sourceMappingURL=fetch_us_csl.js.map