import PortalNode from "kad-rtc/lib/node/portalNode";
import Network from "./network";

export default class ConnectPotalnode extends Network {
  constructor(myport: number, target: { address: string; port: string }) {
    const node = new PortalNode(myport, target);
    super(node.kad);
  }
}
