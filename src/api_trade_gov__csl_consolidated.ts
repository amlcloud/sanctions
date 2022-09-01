const nodeFetch = require("node-fetch");

const API_URL = "https://api.trade.gov/static/consolidated_screening_list/consolidated.json";

export async function api_trade_gov__csl_consolidated(): Promise<{ [key: string]: any }[]> {

    const response = await nodeFetch(API_URL);
    // API response
    const jsonResponse = await response.text();

    //Parsing jsonValues
    const jsonValues = JSON.parse(jsonResponse);
    
    let res: { [key: string]: any }[] = [];
    
    jsonValues.results.forEach((item: any) =>
        res.push(item));

    return Promise.resolve(res);
}
