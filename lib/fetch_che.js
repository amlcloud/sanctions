"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCHE = void 0;
var nodeFetch = require("node-fetch");
const Xml2js = require("xml2js");
//import { createHash } from 'node:crypto';
async function fetchCHE() {
    const response = await nodeFetch('https://www.sesam.search.admin.ch/sesam-search-web/pages/downloadXmlGesamtliste.xhtml?lang=en&action=downloadXmlGesamtlisteAction');
    const bodyXML = await response.text();
    var parseString = (new Xml2js.Parser({ explicitArray: false }))
        .parseString;
    return new Promise((resolve, reject) => parseString(bodyXML, async (err, result) => {
        if (err)
            reject(err);
        const swissArray = result['swiss-sanctions-list']['place'];
        console.log(`individuals count: ${swissArray.length}`);
        resolve(swissArray);
    }));
}
exports.fetchCHE = fetchCHE;
//# sourceMappingURL=fetch_che.js.map