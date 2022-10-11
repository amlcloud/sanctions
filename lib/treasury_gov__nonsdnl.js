"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treasury_gov__nonsdnl = void 0;
var nodeFetch = require("node-fetch");
const Xml2js = require("xml2js");
const node_crypto_1 = require("node:crypto");
async function treasury_gov__nonsdnl() {
    //   const listId: string = 'international.gc.ca';
    const response = await nodeFetch('https://www.treasury.gov/ofac/downloads/consolidated/consolidated.xml');
    const bodyXML = await response.text();
    var parseString = (new Xml2js.Parser({ explicitArray: false }))
        .parseString;
    return new Promise((resolve, reject) => parseString(bodyXML, async (err, result) => {
        if (err)
            reject(err);
        let res = [];
        var hash = (0, node_crypto_1.createHash)('md5').update(bodyXML).digest('hex');
        console.dir(`fetched list document with hash: ${hash}`);
        const individualsArray = result['sdnList']['sdnEntry'];
        console.log(`individuals count: ${individualsArray}`);
        for (const ind of individualsArray) {
            res.push(ind);
            console.log('Individual:', ind);
        }
        resolve(result);
    }));
}
exports.treasury_gov__nonsdnl = treasury_gov__nonsdnl;
//# sourceMappingURL=treasury_gov__nonsdnl.js.map