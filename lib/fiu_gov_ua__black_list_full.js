"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fiu_gov_ua__black_list_full = void 0;
var nodeFetch = require("node-fetch");
const Xml2js = require("xml2js");
async function fiu_gov_ua__black_list_full() {
    const response = await nodeFetch('https://fiu.gov.ua/assets/userfiles/Terror/zBlackListFull.xml');
    const bodyXML = await response.text();
    var parseString = (new Xml2js.Parser({ explicitArray: false }))
        .parseString;
    return new Promise((resolve, reject) => parseString(bodyXML, async (err, result) => {
        if (err)
            reject(err);
        let res = [];
        const individualsArray = result['list-terror']['acount-list'];
        console.log(`individuals count: ${individualsArray}`);
        for (const ind of individualsArray) {
            res.push(ind);
            console.log('Individual:', ind);
        }
        resolve(result);
    }));
}
exports.fiu_gov_ua__black_list_full = fiu_gov_ua__black_list_full;
//# sourceMappingURL=fiu_gov_ua__black_list_full.js.map