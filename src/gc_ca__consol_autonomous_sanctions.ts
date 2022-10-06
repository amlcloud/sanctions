var nodeFetch = require("node-fetch");
import * as Xml2js from 'xml2js';
import { createHash } from 'node:crypto';

export async function gc_ca__consol_autonomous_sanctions(): Promise<{ [key: string]: any }[]> {
//   const listId: string = 'international.gc.ca';
  const response = await 
  nodeFetch('https://www.international.gc.ca/world-monde/assets/office_docs/international_relations-relations_internationales/sanctions/sema-lmes.xml');
  const bodyXML = await response.text();

  var parseString = (new Xml2js.Parser({ explicitArray: false }))
    .parseString;

  return new Promise((resolve, reject) =>
    parseString(bodyXML, async (err: any, result: any) => {

      if (err) reject(err);

      let res: { [key: string]: any }[] = [];

      var hash = createHash('md5').update(bodyXML).digest('hex');
      console.dir(`fetched list document with hash: ${hash}`)

        
      const individualsArray = result['data-set']['record'];
      console.log(`individuals count: ${individualsArray}`)

      for (const ind of individualsArray) {
        res.push(ind);
        console.log('Individual:',ind);

      }
      resolve(result);
    }));
}