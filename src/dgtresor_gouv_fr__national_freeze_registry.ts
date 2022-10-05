const nodeFetch = require("node-fetch");

const API_URL = "https://gels-avoirs.dgtresor.gouv.fr/ApiPublic/api/v1/publication/derniere-publication-fichier-json";

export async function dgtresor_gouv_fr__national_freeze_registry(): Promise<{ [key: string]: any }[]> {

    const response = await nodeFetch(API_URL);
    // API response
    const jsonResponse = await response.text();

    //Parsing jsonValues
    const jsonValues = JSON.parse(jsonResponse);

    let res: { [key: string]: any }[] = [];

    jsonValues.Publications.PublicationDetail.forEach((item: any) => {
        console.log(item);
        res.push(item);
    })
    return Promise.resolve(res);
}
