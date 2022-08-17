var nodeFetch = require("node-fetch");
import * as Xml2js from 'xml2js';
import { createHash } from 'node:crypto';

export async function fetchSDN(): Promise<{ [key: string]: any }[]> {
//   const listId: string = 'scsanctions.un.org';
  const response = await nodeFetch('https://scsanctions.un.org/resources/xml/en/consolidated.xml');
  const bodyXML = await response.text();

  var parseString = (new Xml2js.Parser({ explicitArray: false }))
    .parseString;

  return new Promise((resolve, reject) =>
    parseString(bodyXML, async (err: any, result: any) => {

      if (err) reject(err);

      let res: { [key: string]: any }[] = [];

      var hash = createHash('md5').update(bodyXML).digest('hex');
      console.dir(`fetched list document with hash: ${hash}`)

        
      const individualsArray = result['CONSOLIDATED_LIST']['INDIVIDUALS']['INDIVIDUAL'];
      console.log(`individuals count: ${individualsArray}`)

      for (const ind of individualsArray) {
        res.push(ind);
        console.log('Individual:',ind);

      }
      resolve(result);
    }));
}
