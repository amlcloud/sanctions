"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicsafety_gc_ca__counter_terrorism_entity = void 0;
const nodeFetch = require("node-fetch");
const xml2js = require("xml2js");
const API_URL = "https://www.publicsafety.gc.ca/cnt/_xml/lstd-ntts-eng.xml";
async function publicsafety_gc_ca__counter_terrorism_entity() {
    const response = await nodeFetch(API_URL);
    // API response
    const bodyXML = await response.text();
    let res = [];
    return new Promise((resolve, _reject) => {
        return xml2js.parseString(bodyXML, { explicitArray: false, ignoreAttrs: false, mergeAttrs: true }, async (_errror, result) => {
            const arrIndividuals = result["feed"]["entry"];
            for (const item of arrIndividuals) {
                console.log(item);
                res.push(item);
            }
            resolve(res);
        });
    });
}
exports.publicsafety_gc_ca__counter_terrorism_entity = publicsafety_gc_ca__counter_terrorism_entity;
//# sourceMappingURL=publicsafety_gc_ca__counter_terrorism_entity.js.map