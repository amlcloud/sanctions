const http = require('http');
const express = require('express');
const router = express();
const UNList = require('./lib/un_org__consolidated_entities');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

var IPFS, node: any;
async function main() {
  IPFS = await import('ipfs-core');
  node = await IPFS.create();
}

main();

/** Routes */
router.post('/addUNList',async (req:any, res: any) => {
  try{
    const data = await UNList.un_org__consolidated_entities();
    const fileAdded = await node.add({
      path: "UNsanctions.json",
      content: JSON.stringify(data),
    });
    res.json(fileAdded.cid.toString())
  } catch(error: any) {console.log(error)}
});

router.post('/getUNList',async (req:any, res: any) => {
  try{
    const chunks = [];
    for await (const chunk of node.cat(req.body.cid)) {
      chunks.push(chunk);
    }
    res.json(chunks.toString());
  } catch(error: any) {console.log(error)}
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 5000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));