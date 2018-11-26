import Kademlia from "kad-rtc";
import Broadcast from "kad-rtc/lib/node/broadcast";
import BlockChainApp from "blockchain-ts";
import { ITransactionData } from "blockchain-ts/lib/blockchain/blockchain";
export default class Network {
    kad: Kademlia;
    broadcast: Broadcast;
    blockchain: BlockChainApp;
    constructor(kad: Kademlia, phrase?: string);
    private listenConflict;
    private answerConflict;
    transaction(recipent: string, amount: number, data: ITransactionData): void;
    mine(): Promise<void>;
}
