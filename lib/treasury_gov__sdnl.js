"use strict";
// var nodeFetch = require("node-fetch");
// import * as Xml2js from 'xml2js';
// import { createHash } from 'node:crypto';
//IMPLEMENT USING:
//https://www.treasury.gov/ofac/downloads/sanctions/1.0/sdn_advanced.xml
// refer to: https://docs.google.com/spreadsheets/d/1zT-670VY2B-ljSX_gbf28gqst-1oy-ztdw0aNwmOU3k/edit#gid=0
// This is another list from treasury:
// export async function treasury_gov__sdnl(): Promise<{ [key: string]: any }[]> {
// //   const listId: string = 'international.gc.ca';
//   const response = await 
//   nodeFetch('https://www.treasury.gov/ofac/downloads/consolidated/consolidated.xml');
//   const bodyXML = await response.text();
//   var parseString = (new Xml2js.Parser({ explicitArray: false }))
//     .parseString;
//   return new Promise((resolve, reject) =>
//     parseString(bodyXML, async (err: any, result: any) => {
//       if (err) reject(err);
//       let res: { [key: string]: any }[] = [];
//       var hash = createHash('md5').update(bodyXML).digest('hex');
//       console.dir(`fetched list document with hash: ${hash}`)
//       const individualsArray = result['sdnList']['sdnEntry'];
//       console.log(`individuals count: ${individualsArray}`)
//       for (const ind of individualsArray) {
//         res.push(ind);
//         console.log('Individual:',ind);
//       }
//       resolve(result);
//     }));
// }
//# sourceMappingURL=treasury_gov__sdnl.js.map