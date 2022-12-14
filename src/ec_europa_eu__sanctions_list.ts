const nodeFetch = require("node-fetch");
const xml2js = require("xml2js");
const jp = require("jsonpath");

// To map the "item" element in parsing url xml
type UrlItem = {
  title: string;
  link: string;
  description: string;
  enclosure: Enclosure;
};

// To map the "enclosure" element in parsing url xml
type Enclosure = {
  url: string;
  length: number;
  type: string;
};

export async function ec_europa_eu__sanctions_list(): Promise<{ [key: string]: any }[]> {
  const url: string = await getInitialUrl();
  const response = await nodeFetch(url);
  const bodyXML = await response.text();
  let res: { [key: string]: any }[] = [];

  return new Promise((resolve, _reject) => {
    return xml2js.parseString(
        bodyXML,
        { explicitArray: false, ignoreAttrs: false, mergeAttrs: true },
        async (_errror: any, result: any) => {
          const arrIndividuals = result["export"]["sanctionEntity"];
          for (const item of arrIndividuals) {
            res.push(item);
          }
          resolve(res);
        }
    );
  });
}

/**
 * @returns Parsing url
 * Using jsonpath to get the value of url
 */
async function getInitialUrl(): Promise<string> {
  const response = await nodeFetch(
      "https://webgate.ec.europa.eu/fsd/fsf/public/rss"
  );
  const bodyXML = await response.text();

  let url = "";
  try {
    xml2js.parseString(
        bodyXML,
        { explicitArray: false, ignoreAttrs: false, mergeAttrs: true },
        (error: any, result: any) => {
          if (error) throw error;
          const matches = jp.value(result, "$..channel..item");
          matches.forEach(function (item: UrlItem) {
            if (item.title === "XML (Based on XSD) - v1.1") {
              const enclosure: Enclosure = item["enclosure"];
              url = enclosure.url;
            }
          });

          return url;
        }
    );
  } catch (e: any) {
    return e.message;
  }
  return url;
}
