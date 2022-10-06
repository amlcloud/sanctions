"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gov_uk__financial_sanctions_list = void 0;
const nodeFetch = require("node-fetch");
const Xml2js = require("xml2js");
async function gov_uk__financial_sanctions_list() {
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
exports.gov_uk__financial_sanctions_list = gov_uk__financial_sanctions_list;
//# sourceMappingURL=gov_uk__financial_sanctions_list.js.map