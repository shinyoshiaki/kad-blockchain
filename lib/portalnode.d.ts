import Network from "./network";
export default class ConnectPotalnode extends Network {
    constructor(myport: number, target: {
        address: string;
        port: string;
    });
}
