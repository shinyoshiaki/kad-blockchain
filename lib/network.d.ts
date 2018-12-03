import Kademlia from "kad-rtc";
import Broadcast from "kad-rtc/lib/node/broadcast";
import P2P from "kad-rtc/lib/node/p2p";
import BlockChainApp from "blockchain-ts";
import { ITransactionData } from "blockchain-ts/lib/blockchain/blockchain";
export default class Network {
    kad: Kademlia;
    broadcast: Broadcast;
    blockchain: BlockChainApp;
    p2p: P2P;
    constructor(kad: Kademlia, phrase?: string);
    private listenConflict;
    private answerConflict;
    transaction(recipent: string, amount: number, data: ITransactionData): void;
    mine(): Promise<void>;
}
