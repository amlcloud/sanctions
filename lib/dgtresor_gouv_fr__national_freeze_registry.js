"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dgtresor_gouv_fr__national_freeze_registry = void 0;
const nodeFetch = require("node-fetch");
const API_URL = "https://gels-avoirs.dgtresor.gouv.fr/ApiPublic/api/v1/publication/derniere-publication-fichier-json";
async function dgtresor_gouv_fr__national_freeze_registry() {
    const response = await nodeFetch(API_URL);
    // API response
    const jsonResponse = await response.text();
    //Parsing jsonValues
    const jsonValues = JSON.parse(jsonResponse);
    let res = [];
    jsonValues.Publications.PublicationDetail.forEach((item) => {
        console.log(item);
        res.push(item);
    });
    return Promise.resolve(res);
}
exports.dgtresor_gouv_fr__national_freeze_registry = dgtresor_gouv_fr__national_freeze_registry;
//# sourceMappingURL=dgtresor_gouv_fr__national_freeze_registry.js.map