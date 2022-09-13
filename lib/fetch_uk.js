"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUK = void 0;
const nodeFetch = require("node-fetch");
const Xml2js = require("xml2js");
async function fetchUK() {
    const response = await nodeFetch("https://ofsistorage.blob.core.windows.net/publishlive/2022format/ConList.xml");
    const bodyXML = await response.text();
    const parseString = new Xml2js.Parser({ explicitArray: false }).parseString;
    return new Promise((resolve, reject) => parseString(bodyXML, async (err, result) => {
        if (err)
            reject(err);
        const scheduleArray = result["ArrayOfFinancialSanctionsTarget"]["FinancialSanctionsTarget"];
        resolve(scheduleArray);
        console.log(scheduleArray);
    }));
}
exports.fetchUK = fetchUK;
//# sourceMappingURL=fetch_uk.js.map