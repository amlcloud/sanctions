"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.occ_gov__enforcement_actions = void 0;
const nodeFetch = require("node-fetch");
const XLSX = require("xlsx");
async function occ_gov__enforcement_actions() {
    // download ots enforcement order list
    const response = await nodeFetch("https://occ.gov/static/ots/enforcement/ots-enforcement-order-listing.xlsx");
    const bodyXML = await response.arrayBuffer();
    // save file contents(in form of array buffer) in array
    let workbook = XLSX.read(bodyXML, { raw: true, cellText: false, cellDates: true });
    const sheetName = workbook.SheetNames[0];
    // To extract the URL of hyperlink cells
    const cells = Object.keys(sheetName);
    cells.forEach((cell) => {
        if (sheetName[cell].l && sheetName[cell].l.Target) {
            sheetName[cell].v = sheetName[cell].l.Target;
        }
    });
    // Converting sheet to json
    const listItems = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        blankRows: false, defval: "", raw: true,
    });
    let res = [];
    for (let value of listItems) {
        let data = JSON.parse(JSON.stringify(value));
        const person = {};
        person.recordID = data["Record ID"];
        person.docketNumber = data["Docket Number"];
        person.linkToEnforcementAction = data["Link to Enforcement Action"];
        person.orderNumber = data["Order Number"];
        person.institutionName = data["Institution Name"];
        person.firstName = data["First Name"];
        person.lastName = data["Last Name"];
        person.city = data["City"];
        person.state = data["State"];
        person.otsRegion = data["OTS Region"];
        person.issueDate = data["Issue Date"];
        person.typeDescription = data["Type Description"];
        person.typeOfOrder = data["Type of Order"];
        person.notes = data["Notes"];
        console.log(person);
        res.push(person);
    }
    return Promise.resolve(res);
}
exports.occ_gov__enforcement_actions = occ_gov__enforcement_actions;
//# sourceMappingURL=occ_gov__enforcement_actions.js.map