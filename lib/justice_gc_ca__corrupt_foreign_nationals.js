"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justice_gc_ca__corrupt_foreign_nationals = void 0;
const nodeFetch = require("node-fetch");
const Xml2js = require("xml2js");
// import { createHash } from 'node:crypto';
async function justice_gc_ca__corrupt_foreign_nationals() {
    const response = await nodeFetch("https://laws-lois.justice.gc.ca/eng/XML/SOR-2017-233.xml");
    const bodyXML = await response.text();
    const parseString = new Xml2js.Parser({ explicitArray: false }).parseString;
    return new Promise((resolve, reject) => parseString(bodyXML, async (err, result) => {
        if (err)
            reject(err);
        const scheduleArray = result["Regulation"]["Schedule"][0]["List"]["Item"];
        console.log(`individuals count: ${scheduleArray.length}`);
        console.log(scheduleArray);
        resolve(scheduleArray);
    }));
}
exports.justice_gc_ca__corrupt_foreign_nationals = justice_gc_ca__corrupt_foreign_nationals;
//# sourceMappingURL=justice_gc_ca__corrupt_foreign_nationals.js.map