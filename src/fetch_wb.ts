var nodeFetch = require("node-fetch");
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

  // // Update the hash in the document
  // await db.collection("list").doc(listId).set({
  //   lastUpdateHash: hash,
  // });
  let res: { [key: string]: any }[] = [];
  // update docs in the batch
  const batches: Array<Array<any>> = [[]];
  data.forEach((item: any) => {
    // create the new batch if required
    // if (batches[batches.length - 1].length >= FIRESTORE_WRITE_BATCH_SIZE) {
    //   batches.push([]);
    // }

    // // now get the last batch and add the doc in that
    // const lastBatch = batches[batches.length - 1];
    // lastBatch.push(item);
    res.push(item);
  });

  // // start writing in batches for faster writes
  // // iterate over batches
  // for (const docs of batches) {
  //   const firestoreBatch = db.batch();
  //   docs.forEach((doc: any) => {
  //     var docRef: DocumentReference = db
  //       .collection("list")
  //       .doc(listId)
  //       .collection("item")
  //       .doc(doc?.SUPP_ID?.toString());
  //     firestoreBatch.set(docRef, doc);
  //   });

  //   // write the batch to firestore
  //   await firestoreBatch.commit();
  // }
  return res;
}
