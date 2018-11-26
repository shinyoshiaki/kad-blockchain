import Node from "kad-rtc/lib/node/node";
import Network from "./network";

export default class ConnectNode extends Network {
  constructor(
    target: { address: string; port: string },
    opt?: { pubkey: string; seckey: string }
  ) {
    const node = new Node(target, opt);
    super(node.kad);
  }
}
