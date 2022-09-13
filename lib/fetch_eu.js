"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEU = void 0;
const nodeFetch = require("node-fetch");
const xml2js = require("xml2js");
const jp = require("jsonpath");
async function fetchEU() {
    const url = await getInitialUrl();
    const response = await nodeFetch(url);
    const bodyXML = await response.text();
    let res = [];
    return new Promise((resolve, _reject) => {
        return xml2js.parseString(bodyXML, { explicitArray: false, ignoreAttrs: false, mergeAttrs: true }, async (_errror, result) => {
            const arrIndividuals = result["export"]["sanctionEntity"];
            for (const item of arrIndividuals) {
                res.push(item);
            }
            resolve(res);
        });
    });
}
exports.fetchEU = fetchEU;
/**
 * @returns Parsing url
 * Using jsonpath to get the value of url
 */
async function getInitialUrl() {
    const response = await nodeFetch("https://webgate.ec.europa.eu/fsd/fsf/public/rss");
    const bodyXML = await response.text();
    let url = "";
    try {
        xml2js.parseString(bodyXML, { explicitArray: false, ignoreAttrs: false, mergeAttrs: true }, (error, result) => {
            if (error)
                throw error;
            const matches = jp.value(result, "$..channel..item");
            matches.forEach(function (item) {
                if (item.title === "XML (Based on XSD) - v1.1") {
                    const enclosure = item["enclosure"];
                    url = enclosure.url;
                }
            });
            return url;
        });
    }
    catch (e) {
        return e.message;
    }
    return url;
}
//# sourceMappingURL=fetch_eu.js.map