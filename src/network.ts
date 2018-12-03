import Kademlia from "kad-rtc";
import Broadcast from "kad-rtc/lib/node/broadcast";
import P2P from "kad-rtc/lib/node/p2p";
import { p2pMessageEvent } from "kad-rtc/lib/kad/interface";
import BlockChainApp from "blockchain-ts";
import { ITransactionData } from "blockchain-ts/lib/blockchain/blockchain";
import { RPC, typeRPC } from "blockchain-ts/lib/blockchain/responder";

export default class Network {
  kad: Kademlia;
  broadcast: Broadcast;
  blockchain: BlockChainApp;
  p2p: P2P;
  constructor(kad: Kademlia, phrase?: string) {
    this.kad = kad;
    this.broadcast = new Broadcast(kad);
    this.p2p = new P2P(kad);
    this.blockchain = new BlockChainApp({
      phrase,
      callback: {
        listenConflict: rpc => {
          this.listenConflict(rpc, this.p2p);
        },
        answerConflict: () => {}
      }
    });

    this.broadcast.events.broadcast["network.ts broadcast"] = network => {
      const json: RPC = JSON.parse(network);
      console.log({ json });
      this.blockchain.responder.runRPC(json);
    };

    this.p2p.events.p2p["network.ts p2p"] = (network: p2pMessageEvent) => {
      if (!network.text) return;
      const json: RPC = JSON.parse(network.text);
      console.log({ json });
      if (!this.blockchain.responder.callback) return;
      this.blockchain.responder.callback.answerConflict = rpc => {
        this.answerConflict(rpc, this.p2p, network.nodeId);
      };
      this.blockchain.responder.runRPC(json);
    };
  }

  private listenConflict(rpc: RPC, p2p: P2P) {
    const str = JSON.stringify(rpc);    
    const targets = this.kad.f.getAllPeerIds();
    if (!targets) return;
    p2p.send(targets[0], { text: str });
  }

  private answerConflict(rpc: RPC, p2p: P2P, nodeId: string) {
    const str = JSON.stringify(rpc);    
    p2p.send(nodeId, { text: str });
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
