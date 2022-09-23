"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bis_doc_gov__denied_persons = void 0;
const parse = require('csv-parser');
const https = require('https');
let res = [];
let path = 'https://www.bis.doc.gov/dpl/dpl.txt';
function parseCSV() {
    let keys = [];
    let values;
    return new Promise((resolve, reject) => {
        https.get(path, (stream) => {
            stream.pipe(parse())
                .on('data', function (csvrow) {
                let newrow = {};
                keys = Object.keys(csvrow)[0].replaceAll('"', '').split('\t');
                values = Object.values(csvrow)[0];
                keys.map((item, index) => {
                    newrow[item] = values.split('\t')[index].replaceAll('"', '');
                });
                res.push(newrow);
            })
                .on('end', function () {
                //do something with res
                resolve('resolved');
            });
        });
    });
}
// export async function fetchUsaBis() {
async function bis_doc_gov__denied_persons() {
    await parseCSV();
    console.log(res);
    return Promise.resolve(res);
}
exports.bis_doc_gov__denied_persons = bis_doc_gov__denied_persons;
//# sourceMappingURL=bis_doc_gov__denied_persons.js.map