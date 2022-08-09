var nodeFetch = require("node-fetch");
var XLSX = require("xlsx");

type NlIndividual = {
  surname?: string;
  firstName?: string;
  alias?: string;
  dob?: Date;
  placeOfBirth?: string;
  dateOfMinisterialDecision?: Date;
  linkOfOfficialNotification?: string;
}

export async function fetchNL(): Promise<{ [key: string]: any }[]> {

  const response = await nodeFetch('https://www.government.nl/binaries/government/documenten/reports/2016/01/15/national-terrorism-list/eng-terrorismelijst.ods');
  const bodyXML = await response.arrayBuffer();


  var workbook = XLSX.read(bodyXML, { raw: true, cellText: false, cellDates: true });
  var ws = workbook.Sheets['Sheet1'];

  //Skipping the first row: Headers are starting from A3
  var range = XLSX.utils.decode_range(ws['!ref']);
  range.s.r = 2;
  var new_range = XLSX.utils.encode_range(range);

  //To extract the URL of hyperlink cells
  const cells = Object.keys(ws);
  cells.forEach(cell => {
    if (ws[cell].l && ws[cell].l.Target) {
      ws[cell].v = ws[cell].l.Target;
    }
  })
  //Converting sheet to json
  var nlIndividuals = XLSX.utils.sheet_to_json(ws, {
    blankRows: false, defval: '', range: new_range, raw: true,
  });

  let res: { [key: string]: any }[] = [];
  for (let value of nlIndividuals) {
    var data = JSON.parse(JSON.stringify(value));
    console.log(data);
    const person: NlIndividual = {};

    person.surname = data["Surname"];
    person.firstName = data["First name(s)"];
    person.dob = data["Date of Birth(DD-MM-JJJJ)"];
    person.placeOfBirth = data["Place of Birth"];
    person.dateOfMinisterialDecision = data["Date of ministerial decision (DD/MM/JJJJ)"];
    person.linkOfOfficialNotification = data["Link official notification"];

    console.log(person);

  }
  return Promise.resolve(res);
}