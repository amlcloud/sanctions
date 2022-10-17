const nodeFetch = require("node-fetch");

const xml2js = require("xml2js");

const API_URL = "https://www.publicsafety.gc.ca/cnt/_xml/lstd-ntts-eng.xml";

export async function publicsafety_gc_ca__counter_terrorism_entity(): Promise<{ [key: string]: any }[]> {

    const response = await nodeFetch(API_URL);
    
    // API response
    const bodyXML = await response.text();

    let res: { [key: string]: any }[] = [];
    
    return new Promise((resolve, _reject) => {
        return xml2js.parseString(
            bodyXML,
            { explicitArray: false, ignoreAttrs: false, mergeAttrs: true },
            async (_errror: any, result: any) => {
              const arrIndividuals = result["feed"]["entry"];
              for (const item of arrIndividuals) {
                console.log(item);
                res.push(item);
              }
              resolve(res);
            }
        );
      });
}
