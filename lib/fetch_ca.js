"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCA = void 0;
var nodeFetch = require("node-fetch");
const Xml2js = require("xml2js");
const node_crypto_1 = require("node:crypto");
async function fetchCA() {
    //   const listId: string = 'international.gc.ca';
    const response = await nodeFetch('https://www.international.gc.ca/world-monde/assets/office_docs/international_relations-relations_internationales/sanctions/sema-lmes.xml');
    const bodyXML = await response.text();
    var parseString = (new Xml2js.Parser({ explicitArray: false }))
        .parseString;
    return new Promise((resolve, reject) => parseString(bodyXML, async (err, result) => {
        if (err)
            reject(err);
        let res = [];
        var hash = (0, node_crypto_1.createHash)('md5').update(bodyXML).digest('hex');
        console.dir(`fetched list document with hash: ${hash}`);
        const individualsArray = result['data-set']['record'];
        console.log(`individuals count: ${individualsArray}`);
        for (const ind of individualsArray) {
            res.push(ind);
            console.log('Individual:', ind);
        }
        resolve(result);
    }));
}
exports.fetchCA = fetchCA;
//# sourceMappingURL=fetch_ca.js.map