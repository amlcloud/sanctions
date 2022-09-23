"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.un_org__consolidated_entities = void 0;
const nodeFetch = require("node-fetch");
const Xml2js = require("xml2js");
const node_crypto_1 = require("node:crypto");
async function un_org__consolidated_entities() {
    const response = await nodeFetch("https://scsanctions.un.org/resources/xml/en/consolidated.xml");
    const bodyXML = await response.text();
    const parseString = (new Xml2js.Parser({ explicitArray: false })).parseString;
    return new Promise((resolve, reject) => parseString(bodyXML, async (err, result) => {
        if (err)
            reject(err);
        let res = [];
        let hash = (0, node_crypto_1.createHash)("md5").update(bodyXML).digest("hex");
        console.dir(`fetched list document with hash: ${hash}`);
        const individualsArray = result["CONSOLIDATED_LIST"]["ENTITIES"]["ENTITY"];
        console.log(`individuals count: ${individualsArray.length}`);
        for (const ind of individualsArray) {
            res.push(ind);
        }
        resolve(result);
    }));
}
exports.un_org__consolidated_entities = un_org__consolidated_entities;
//# sourceMappingURL=un_org__consolidated_entities.js.map