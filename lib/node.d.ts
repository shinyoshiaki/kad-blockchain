import Network from "./network";
export default class ConnectNode extends Network {
    constructor(target: {
        address: string;
        port: string;
    }, opt?: {
        pubkey: string;
        seckey: string;
    });
}
