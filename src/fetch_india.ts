const pdf_table_extractor = require("pdf-table-extractor");
const download = require('download-pdf')


export async function fetchIndia(): Promise<{ [key: string]: any }[]> {
  let res: { [key: string]: any }[] = [];
  const datas = [{pdf: "https://www.mha.gov.in/sites/default/files/BannedOrgOld_16032022.pdf", option: {filename: "banned.pdf"}},
    {pdf: "https://www.mha.gov.in/sites/default/files/UnlawfulAssociationsUAPA_16032022.pdf", option: {filename: "unlawful.pdf"},}]
  function downloadParse(URLToDownload: any, option: any) {
    res = []
    return new Promise((resolve: any, reject: any) => {
    download(URLToDownload, option, function(err: any) {
      if (err) throw err
        pdf_table_extractor(option.filename, (result: any) => {
          if(result.pageTables) {
            for(let pageTable of result.pageTables) {
              for(let table of pageTable.tables) {
                res.push(table[1].replaceAll('\n',''))
              }
            }
          }
          resolve('resolved')
        });
      })
    })
  }
  await downloadParse(datas[0].pdf, datas[0].option)
  console.log(res)
  // await downloadParse(datas[1].pdf, datas[1].option)
  // console.log(res)
  return Promise.resolve(res);
}