"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gc_ca__consol_autonomous_sanctions = void 0;
var nodeFetch = require("node-fetch");
const Xml2js = require("xml2js");
const node_crypto_1 = require("node:crypto");
async function gc_ca__consol_autonomous_sanctions() {
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
exports.gc_ca__consol_autonomous_sanctions = gc_ca__consol_autonomous_sanctions;
//# sourceMappingURL=gc_ca__consol_autonomous_sanctions.js.map