var nodeFetch = require("node-fetch");
import * as Xml2js from 'xml2js';
//import { createHash } from 'node:crypto';

export async function fetchCAlaw(): Promise<{ [key: string]: any }[]> {
  const response = await nodeFetch('https://laws-lois.justice.gc.ca/eng/XML/SOR-2017-233.xml');
  const bodyXML = await response.text();

  var parseString = (new Xml2js.Parser({ explicitArray: false }))
    .parseString;

  return new Promise((resolve, reject) =>
    parseString(bodyXML, async (err: any, result: any) => {

      if (err) reject(err);

      const scheduleArray = result['Regulation']['Schedule'][0]['List']['Item'];
      console.log(`individuals count: ${scheduleArray.length}`)

      resolve(scheduleArray);
    }));

}
