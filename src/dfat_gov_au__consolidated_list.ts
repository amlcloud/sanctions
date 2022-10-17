// import axios from "axios";
const XLSX = require("xlsx");
import fetch from 'node-fetch';

export async function dfat_gov_au__consolidated_list(): Promise<{ [key: string]: any }[]> {
  console.log("get list...");
  // download au sanctions file-
  // const resp = await axios({
  //   method: "GET",
  //   url: "https://www.dfat.gov.au/sites/default/files/regulation8_consolidated.xls",
  //   responseType: "arraybuffer",
  // });

  // // save file contents(in form of array buffer) in array
  // const buffers: any = [];
  // console.log("pushing to buffer");
  // buffers.push(resp.data);

  const response = await fetch('https://www.dfat.gov.au/sites/default/files/regulation8_consolidated.xls');
  const buffers: any = [];
  console.log("pushing to buffer");
  buffers.push(await response.buffer());

  const buffer = Buffer.concat(buffers);
  const workbook = XLSX.read(buffer);
  const sheetName = workbook.SheetNames[0];
  console.log("sheetName ", sheetName);

  // CONVERT SHEET TO JSON
  const auIndividuals = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  console.log("au Individuals count ", auIndividuals.length);

  let res = [];
  for (const person of auIndividuals as any) {
    // console.log(
    //   `loop # ${++count} -- looping over ${person["Name of Individual or Entity"]}`
    // );

    let p: any = {};

    p["Reference"] = person["Reference"] || "";
    p["Name of Individual or Entity"] =
      person["Name of Individual or Entity"] || "";
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
