var nodeFetch = require("node-fetch");
var xml2js = require("xml2js");
var jp = require('jsonpath');

//Do the comment
type UrlItem = {
    title: string;
    link: string;
    description: string;
    enclosure: Enclosure;
}

//Do the comment
type Enclosure = {
    url: string;
    length: number;
    type: string;
}
export async function fetchEU(): Promise<{ [key: string]: any }[]> {
    const url: string = await getInitialUrl();
    const response = await nodeFetch(url);
    const bodyXML = await response.text();
    let res: { [key: string]: any }[] = [];

    return new Promise((resolve, _reject) => {
        return xml2js.parseString(bodyXML, { explicitArray: false, ignoreAttrs: false, mergeAttrs: true }, async (_errror: any, result: any) => {
            console.log("Arr Individuals");
            const arrIndividuals = result["export"]["sanctionEntity"];
            console.log(arrIndividuals);
            res.push(arrIndividuals);
            resolve(res)
        });

    }

    );

}
//Add comment
async function getInitialUrl(): Promise<string> {

    const response = await nodeFetch('https://webgate.ec.europa.eu/fsd/fsf/public/rss');
    const bodyXML = await response.text();

    var url = ""
    try {
        xml2js.parseString(bodyXML, { explicitArray: false, ignoreAttrs: false, mergeAttrs: true }, (error: any, result: any) => {
            if (error) throw (error);

            var matches = (jp.value(result, '$..channel..item'));
            matches.forEach(function (item: UrlItem) {
                if (item.title === 'XML (Based on XSD) - v1.1') {
                    var enclosure: Enclosure = item["enclosure"]
                    url = enclosure.url;
                }
            })

            return url;
        });
    } catch (e: any) {
        return e.message;
    }
    return url;
}

