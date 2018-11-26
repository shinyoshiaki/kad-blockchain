import Kademlia from "kad-rtc";
import Broadcast from "kad-rtc/lib/node/broadcast";
import BlockChainApp from "blockchain-ts";
import { ITransactionData } from "blockchain-ts/lib/blockchain/blockchain";
import { RPC, typeRPC } from "blockchain-ts/lib/blockchain/responder";

export default class Network {
  kad: Kademlia;
  broadcast: Broadcast;
  blockchain: BlockChainApp;
  constructor(kad: Kademlia, phrase?: string) {
    this.kad = kad;
    this.broadcast = new Broadcast(kad);
    this.blockchain = new BlockChainApp({
      phrase,
      callback: {
        listenConfilict: this.listenConflict,
        answerConflict: this.answerConflict
      }
    });

    this.broadcast.events.broadcast["network.ts"] = network => {
      const json: RPC = JSON.parse(network);
      this.blockchain.responder.runRPC(json);
    };
  }

  private listenConflict(rpc: RPC) {
    const str = JSON.stringify(rpc);
    this.broadcast.broadcast(str);
  }

  private answerConflict(rpc: RPC) {
    const str = JSON.stringify(rpc);
    this.broadcast.broadcast(str);
  }

  transaction(recipent: string, amount: number, data: ITransactionData) {
    const tran = this.blockchain.makeTransaction(recipent, amount, data);
    if (!tran) return;
    const rpc: RPC = { type: typeRPC.TRANSACRION, body: tran };
    const str = JSON.stringify(rpc);
    this.broadcast.broadcast(str);
  }

  async mine() {
    const block = await this.blockchain.mine();
    const rpc: RPC = { type: typeRPC.NEWBLOCK, body: block };
    const str = JSON.stringify(rpc);
    this.broadcast.broadcast(str);
  }
}
