var nodeFetch = require("node-fetch");
import * as Xml2js from 'xml2js';

export async function fiu_gov_ua__terrorist_activity(): Promise<{ [key: string]: any }[]> {

  const response = await nodeFetch('https://fiu.gov.ua/assets/userfiles/Terror/zBlackListFull.xml');
  const bodyXML = await response.text();

  var parseString = (new Xml2js.Parser({ explicitArray: false }))
    .parseString;

  return new Promise((resolve, reject) =>
    parseString(bodyXML, async (err: any, result: any) => {

      if (err) reject(err);

      let res: { [key: string]: any }[] = [];
        
      const individualsArray = result['list-terror']['acount-list'];
      console.log(`individuals count: ${individualsArray}`)

      for (const ind of individualsArray) {
        res.push(ind);
        console.log('Individual:',ind);

      }
      resolve(result);
    }));
}
