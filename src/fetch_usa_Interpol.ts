const nodeFetch = require("node-fetch");

type person = {
    forename?: string;
    dateOfBirth?: Date;
    entityId?: string;
    nationalities?: string[];
    name?: string;
    self?: string;
    images?: string;
    thumbnail?: string;
}


const RESULTSPERPAGE = 160;
const API_URL = "https://ws-public.interpol.int/notices/v1/red"

/**
 * Accesses Interpol Notices API and retrieves Red Notice data
 * @returns {any[]} Array of JS Objects with red notice data
 */
export async function fetchIP(): Promise<any[]> {
    let res: any[] = [];
    // Response Object

    let temp1 = await nodeFetch(API_URL, {
        method: "GET",
        body: new nodeFetch.body({
            "page": 1,
            "resultPerPage": RESULTSPERPAGE
        })
    })
    let temp2 = JSON.parse(temp1)
    const pagelimit = Math.ceil(temp2.total/RESULTSPERPAGE);
    // Calculate Page limit for loop

    res = saveData(res, temp2)
    // Add 1st page of Red Noticed Individuals

    for (let i = 2; i <= pagelimit; i++) {
        const response = await nodeFetch(API_URL, {
            method: "GET",
            body: new nodeFetch.body({
                "page": i,
                "resultPerPage": RESULTSPERPAGE,
            })
        })
        let parsedRes = JSON.parse(response)
        res = saveData(res, parsedRes)
    }
    // Add remaining pages
    return Promise.resolve(res)
}   

function saveData(res: any, data: any): any {
    for (let i of data._embedded.notices) {
        const person: person = {}
        person.forename = i.forename;
        person.dateOfBirth = i.date_of_birth;
        person.entityId = i.entity_id;
        person.nationalities = i.nationalities;
        person.name = i.name;
        person.self = i.links.self.href;
        person.images = i.links.images.href;
        person.thumbnail = i.links.thumbnail.href;
        res.push(person)
    }
    return res;
}
