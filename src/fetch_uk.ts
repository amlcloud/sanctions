const nodeFetch = require("node-fetch");
import * as Xml2js from "xml2js";

export async function fetchUK(): Promise<{ [key: string]: any }[]> {
  const response = await nodeFetch(
    "https://ofsistorage.blob.core.windows.net/publishlive/2022format/ConList.xml"
  );
  const bodyXML = await response.text();

  const parseString = new Xml2js.Parser({ explicitArray: false }).parseString;

  return new Promise((resolve, reject) =>
    parseString(bodyXML, async (err: any, result: any) => {
      if (err) reject(err);

      const scheduleArray =
        result["ArrayOfFinancialSanctionsTarget"]["FinancialSanctionsTarget"];
      console.log(`individuals count: ${scheduleArray.length}`);

      resolve(scheduleArray);
    })
  );
}
