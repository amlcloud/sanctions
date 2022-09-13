"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWB = void 0;
const nodeFetch = require("node-fetch");
const node_crypto_1 = require("node:crypto");
async function fetchWB() {
    var _a;
    // some configs
    const API_URL = "https://apigwext.worldbank.org/dvsvc/v1.0/json/APPLICATION/ADOBE_EXPRNCE_MGR/FIRM/SANCTIONED_FIRM";
    const API_KEY = "z9duUaFUiEUYSHs97CU38fcZO7ipOPvm";
    // Make the API Call
    const response = await nodeFetch(API_URL, {
        method: "GET",
        headers: new nodeFetch.Headers({
            apiKey: API_KEY,
        }),
    });
    // get the data
    const text = await response.text();
    const responseJson = JSON.parse(text);
    const data = ((_a = responseJson === null || responseJson === void 0 ? void 0 : responseJson.response) === null || _a === void 0 ? void 0 : _a.ZPROCSUPP) || [];
    console.log(`items found: ${data.length}`);
    // Generate the hash in the list document
    const hash = (0, node_crypto_1.createHash)("md5").update(text).digest("hex");
    console.log(`fetched list document with hash: ${hash}`);
    let res = [];
    // update docs in the batch
    // const batches: Array<Array<any>> = [[]];
    data.forEach((item) => {
        res.push(item);
    });
    return res;
}
exports.fetchWB = fetchWB;
//# sourceMappingURL=fetch_wb.js.map