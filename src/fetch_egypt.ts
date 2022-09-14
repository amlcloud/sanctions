const nodeFetch = require("node-fetch");
const XLSX = require("xlsx");

export async function fetchEgypt(): Promise<{ [key: string]: any }[]> {
  let result: any = {}
  let res: { [key: string]: any }[] = [];

  function fetchXLSX(bodyXML: any, fileType: any) {
    let fetchedXLSX: any = {}
    let workbook = XLSX.read(bodyXML, { raw: true, cellText: false, cellDates: true });
    const sheetNames = workbook.SheetNames;
    let data: any = {}
    sheetNames.map((sheetName: any, index: any) => {
      data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
      res = []
      // when second file is parsing
      if (fileType == 2) {
        fetchedXLSX.firstSheet = data
        return fetchedXLSX
      }
      // when first file is parsing
      if (index == 0) {
        const keys = Object.values(data[2])
        let obj: any = {}
        for (let i  = 3; i < data.length; i ++) {
          obj = {}
          keys.map((key: any, index: any) => {
            obj[key] = Object.values(data[i])[index]
          })
          res.push(obj)
        }
        fetchedXLSX.firstSheet = res;
      }

      if (index == 1 || index == 2) {
        const keys = Object.values(data[0])
        let obj: any = {}
        for (let i  = 1; i < data.length; i ++) {
          obj = {}
          keys.map((key: any, index: any) => {
            obj[key] = Object.values(data[i])[index]
          })
          res.push(obj)
        }
      }
      if (index == 1) fetchedXLSX.secondSheet = res;
      if (index == 2) fetchedXLSX.thirdSheet = res;
    })
    return fetchedXLSX
  }  
  // download ots enforcement order list
  const xlsx1 = await nodeFetch("https://mlcu.org.eg/upload/uploadeditor/files/%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%A6%D9%85%20%D8%A7%D9%84%D9%85%D8%AD%D9%84%D9%8A%D8%A9/%D9%82%D9%88%D8%A7%D8%A6%D9%85%20%D8%A7%D9%84%D9%83%D9%8A%D8%A7%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D8%AD%D9%84%D9%8A%D8%A9%20%D8%AA%D8%B9%D8%AF%D9%8A%D9%84%20%D8%A8%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE%2014%20%D8%A3%D8%BA%D8%B3%D8%B7%D8%B3%202022.xlsx");
  const bodyXML1 = await xlsx1.arrayBuffer();
  const xlsx2 = await nodeFetch("https://mlcu.org.eg/upload/uploadeditor/files/%D9%82%D9%88%D8%A7%D8%A6%D9%85%20%D9%85%D8%AC%D9%84%D8%B3%20%D8%A7%D9%84%D8%A7%D9%85%D9%86%20%D8%B0%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B5%D9%84%D8%A9/%D9%82%D8%A7%D8%A6%D9%85%D8%A9%20%D8%A7%D9%84%D8%AC%D8%B2%D8%A7%D8%A1%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%88%D8%AD%D8%AF%D8%A9%20%D9%84%D9%85%D8%AC%D9%84%D8%B3%20%D8%A7%D9%84%D8%A3%D9%85%D9%86%2026-07-2022.xlsx");
  const bodyXML2 = await xlsx2.arrayBuffer();

  result.firstFile = fetchXLSX(bodyXML1, 1)
  result.secondFile = fetchXLSX(bodyXML2, 2)
  console.log(result)
  return Promise.resolve(result);
}