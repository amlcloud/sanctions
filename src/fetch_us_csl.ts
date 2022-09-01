var nodeFetch = require("node-fetch");
import { createHash } from "node:crypto";


export async function fetchUScsl() {
  // some configs
  const API_URL =
    "https://data.trade.gov/consolidated_screening_list/v1/sources";
  const API_KEY = "4dab605cb8754fc3bbe9f191a3a8d4bf";

  // Make the API Call
  const response = await nodeFetch(API_URL, {
    method: "GET",
    headers: new nodeFetch.Headers({
      "subscription-key": API_KEY,
    }),
  });

  // get the data
  const text = await response.text();
  const responseJson = JSON.parse(text);
  const data = responseJson?.response?.ZPROCSUPP || [];
  console.log(`items found: ${data.length}`);
  console.log(text);
  // Generate the hash in the list document
  const hash = createHash("md5").update(text).digest("hex");
  console.log(`fetched list document with hash: ${hash}`);

  let res: { [key: string]: any }[] = [];
  // update docs in the batch
  // const batches: Array<Array<any>> = [[]];


  await data.forEach((item: any) => {
    res.push(item);
  });

  return res;
}
