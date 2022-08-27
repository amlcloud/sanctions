const pdf_table_extractor = require("pdf-table-extractor");
const download = require('download-pdf')


export async function state_gov__master_sanctions_chart(): Promise<{ [key: string]: any }[]> {
  let res: { [key: string]: any }[] = [];
  const URLToDownload = "https://www.state.gov/wp-content/uploads/2022/04/MASTER-Sanctions-chart-4.8.22-1.pdf";
  const option = {filename: "download.pdf"}
  function downloadParse(URLToDownload: any, option: any) {
    return new Promise((resolve: any, reject: any) => {
    download(URLToDownload, option, function(err: any) {
      if (err) throw err
        pdf_table_extractor(option.filename, (result: any) => {
          let tableHeaderArr: any = [];
          result.pageTables[0].tables[1].map((item: any) => {
            tableHeaderArr.push(item.replaceAll('\n',''))
          })
          let newrow: any = {};
          for(let pageTable of result.pageTables) {
            for(let table of pageTable.tables) {
              if(table.join('').length)
                tableHeaderArr.map((item: string, index: number) => {
                  newrow[item] = table[index].replaceAll('\n','')
                })
            }
            res.push(newrow)
          }
          resolve('resolved')
        });
      })
    })
  }
  await downloadParse(URLToDownload, option)
  console.log(res)
  return Promise.resolve(res);
}