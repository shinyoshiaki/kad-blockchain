import ConnectPotalnode from "../portalnode";
import {
  ITransactionData,
  validChain
} from "blockchain-ts/lib/blockchain/blockchain";
import { ETransactionType } from "blockchain-ts/lib/blockchain/interface";

const responce: { [key: string]: any } = {};
const reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

let node: ConnectPotalnode;

reader.on("line", (data: any) => line(data));

function line(data: any) {
  const rpc = data.toString().split(" ")[0];
  const req = data.toString().split(" ")[1];

  if (Object.keys(responce).includes(rpc)) {
    responce[rpc](req);
  }
}

responce.connect = (req: any) => {
  console.log("connect to network");
  const body = req.split(",");
  node = new ConnectPotalnode(body[0], { address: body[1], port: body[2] });
};

responce.mining = () => {
  node.mine();
};

responce.makeTransaction = (req: any) => {
  const body = req.split(",");
  //recipient, amount, data
  const data: ITransactionData = {
    type: ETransactionType.transaction,
    payload: body[2]
  };
  node.transaction(body[0], parseInt(body[1]), data);
};

responce.balance = () => {
  console.log("now balance", node.blockchain.nowAmount());
};

responce.chain = () => {
  if (validChain(node.blockchain.chain))
    console.log("now blockchain", node.blockchain.chain);
  else console.log("chain error");
};

responce.address = () => {
  console.log("my address", node.blockchain.address);
};

responce.kad = () => {
  console.log(node.kad.f.getAllPeerIds());
};

responce.help = () => {
  console.log(Object.keys(responce));
};

console.log(Object.keys(responce));
