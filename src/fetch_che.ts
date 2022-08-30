var nodeFetch = require("node-fetch");
import * as Xml2js from 'xml2js';
//import { createHash } from 'node:crypto';

export async function fetchCHE(): Promise<{ [key: string]: any }[]> {
  const response = await nodeFetch('https://www.sesam.search.admin.ch/sesam-search-web/pages/downloadXmlGesamtliste.xhtml?lang=en&action=downloadXmlGesamtlisteAction');
  const bodyXML = await response.text();
  
  var parseString = (new Xml2js.Parser({ explicitArray: false }))
    .parseString;

  return new Promise((resolve, reject) =>
    parseString(bodyXML, async (err: any, result: any) => {

      if (err) reject(err);

      const swissArray = result['swiss-sanctions-list']['place'];
      console.log(`individuals count: ${swissArray.length}`)

      resolve(swissArray);
    }));

}
