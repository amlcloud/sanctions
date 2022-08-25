//const PDFParser = require("pdf2json");
const fs = require('fs');
const nodeFetch = require("node-fetch");
var pdf_table_extractor = require("pdf-table-extractor");
const { PdfReader,Rule } = require("pdfreader");


export async function state_gov__master_sanctions_chart(): Promise<{ [key: string]: any }[]> {

    // download au sanctions file-
  // const response = await nodeFetch('https://www.stnpmate.gov/wp-content/uploads/2022/04/MASTER-Sanctions-chart-4.8.22-1.pdf');
  //  const buffer= await response.arrayBuffer();
    // const pdfParser = new PDFParser();
    
    //       pdfParser.parseBuffer(buffer);
    //       pdfParser.on("pdfParser_dataError",(errData :any)=> console.error(errData.parserError) );
    //       pdfParser.on("pdfParser_dataReady", (pdfData:any) => {
    //          // fs.writeFile("./F1040EZ.fields.json", JSON.stringify(pdfParser.getRawTextContent()), ()=>{console.log("Done.");});
    //       });

    let res: { [key: string]: any }[] = [];
    const processItem = Rule.makeItemProcessor([
        Rule.on(/^Updated April  8, 2022 \"(.*)\"$/)
          .parseNextItemValue()
          .then((value:any)=>console.log(value)),
        Rule.on(/^c1$/).parseTable(3).then((value:any)=>console.log(value)),
        Rule.on(/^Values\:/)
          .accumulateAfterHeading()
          .then((value:any)=>console.log(value)),
      ]);
      
  //  pdf_table_extractor("./MASTER-Sanctions-chart-4.8.22-1.pdf",success,error);
    new PdfReader().parseFileItems("./MASTER-Sanctions-chart-4.8.22-1.pdf", (err:any, item:any) => {
        if (err) console.error("error:", err);
        else processItem(item);
      });
      

    return Promise.resolve(res);


  
}
  

//PDF parsed
function success(result:any)
{
    fs.writeFile("./F1040EZ.fields.json", JSON.stringify(result), ()=>{console.log("Done.");});
}
function error(err:any)
{
   console.error('Error: ' + err);
}