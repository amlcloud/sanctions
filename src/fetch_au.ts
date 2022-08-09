import axios from "axios";
var XLSX = require("xlsx");

export async function fetchAU(): Promise<{ [key: string]: any }[]> {

  // download au sanctions file-
  const resp = await axios({
    method: "GET",
    url: "https://www.dfat.gov.au/sites/default/files/regulation8_consolidated.xls",
    responseType: "arraybuffer",
  });

  // save file contents(in form of array buffer) in array
  const buffers: any = [];
  console.log("pushing to buffer");
  buffers.push(resp.data);
  const buffer = Buffer.concat(buffers);
  const workbook = XLSX.read(buffer);
  const sheetName = workbook.SheetNames[0];
  console.log("sheetName ", sheetName);

  //CONVERT SHEET TO JSON
  const auIndividuals = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  console.log("au Individuals count ", auIndividuals.length);

  let res = [];
  for (const person of auIndividuals as any) {

    // console.log(
    //   `loop # ${++count} -- looping over ${person["Name of Individual or Entity"]}`
    // );

    const p: any = {};

    p["Reference"] = person["Reference"] || "";
    p["Name of Individual or Entity"] = person["Name of Individual or Entity"] || "";
    p["Type"] = person["Type"] || "";
    p["Name Type"] = person["Name Type"] || "";
    p["Date of Birth"] = person["Date of Birth"] || "";
    p["Place of Birth"] = person["Place of Birth"] || "";
    p["Citizenship"] = person["Citizenship"] || "";
    p["Address"] = person["Address"] || "";
    p["Additional Information"] = person["Additional Information"] || "";
    p["Listing Information"] = person["Listing Information"] || "";
    p["Committees"] = person["Committees"] || "";
    p["Control Date"] = person["Control Date"] || "";

    const docId = person["Name of Individual or Entity"];

    console.log("docId ", docId);

    res.push(p);

  }

  return Promise.resolve(res);

}