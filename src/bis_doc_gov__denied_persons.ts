const parse = require('csv-parser')
const https = require('https')

let res: any = [];
let path: string = 'https://www.bis.doc.gov/dpl/dpl.txt';

function parseCSV() {
  let keys: string[] = [];
  let values: any;
  return new Promise((resolve: any, reject: any) => {
    https.get(path, (stream: any) => {
      stream.pipe(parse())
      .on('data', function(csvrow: any) {
        let newrow: any = {};
        keys = Object.keys(csvrow)[0].replaceAll('"', '').split('\t')
        values = Object.values(csvrow)[0]
        keys.map((item: string, index: number) => {
          newrow[item] = values.split('\t')[index].replaceAll('"', '')
        })
        res.push(newrow);
      })
      .on('end',function() {
        //do something with res
        resolve('resolved')
      })
    })
  })
}

// export async function fetchUsaBis() {
export async function bis_doc_gov__denied_persons(): Promise<{ [key: string]: any }[]> {
  
  await parseCSV()
  
  console.log(res);

  return Promise.resolve(res);

}