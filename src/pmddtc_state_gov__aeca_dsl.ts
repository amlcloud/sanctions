const nodeFetch = require("node-fetch");
const XLSX = require("xlsx");

type Individual = {
    partyName?: string;
    dateOfBirth?: Date;
    federalRegisterNotice?: string;
    noticeDate?: Date;
    correctedNotice?: string;
    correctedNoticeDate?: Date;
}

export async function pmddtc_state_gov__aeca_dsl(): Promise<{ [key: string]: any }[]> {
  // download au sanctions file-
  const response = await nodeFetch("https://www.pmddtc.state.gov/sys_attachment.do?sys_id=c1d49a191b0f70d0d1f1ea02f54bcb74");
  const bodyXML = await response.arrayBuffer();

  // save file contents(in form of array buffer) in array
  let workbook = XLSX.read(bodyXML, { raw: true, cellText: false, cellDates: true });
  const sheetName = workbook.SheetNames[0];

  // Converting sheet to json
  const usaIndividuals = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    blankRows: false, defval: "", raw: true,
  });

  let res: { [key: string]: any }[] = [];

  for (let value of usaIndividuals) {
    let data = JSON.parse(JSON.stringify(value));

    const person: Individual = {};

    person.partyName = data["Party Name"];
    person.dateOfBirth = data["Date Of Birth"];
    person.federalRegisterNotice = data["Federal Register Notice"];
    person.noticeDate = data["Notice Date"];
    person.correctedNotice = data["Corrected Notice"];
    person.correctedNoticeDate = data["Corrected Notice Date"];

    console.log(person);
    res.push(person);
  }
  return Promise.resolve(res);
}
