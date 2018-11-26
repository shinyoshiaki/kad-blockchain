import PortalNode from "kad-rtc/lib/node/portalNode";
import Network from "./network";

export default class ConnectPotalnode extends Network {
  constructor(target: { address: string; port: string }) {
    const node = new PortalNode(20000, target);
    super(node.kad);
  }
}
