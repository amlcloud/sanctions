const nodeFetch = require("node-fetch");
import { createHash } from "node:crypto";


export async function fetchWB() {
  // some configs
  const API_URL =
    "https://apigwext.worldbank.org/dvsvc/v1.0/json/APPLICATION/ADOBE_EXPRNCE_MGR/FIRM/SANCTIONED_FIRM";
  const API_KEY = "z9duUaFUiEUYSHs97CU38fcZO7ipOPvm";

  // Make the API Call
  const response = await nodeFetch(API_URL, {
    method: "GET",
    headers: new nodeFetch.Headers({
      apiKey: API_KEY,
    }),
  });

  // get the data
  const text = await response.text();
  const responseJson = JSON.parse(text);
  const data = responseJson?.response?.ZPROCSUPP || [];
  console.log(`items found: ${data.length}`);

  // Generate the hash in the list document
  const hash = createHash("md5").update(text).digest("hex");
  console.log(`fetched list document with hash: ${hash}`);

  let res: { [key: string]: any }[] = [];
  // update docs in the batch
  // const batches: Array<Array<any>> = [[]];
  data.forEach((item: any) => {
    res.push(item);
  });

  return res;
}
