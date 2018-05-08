import { PBFT } from "../PBFT";
import { Gossip } from "../gossip/Gossip";
import { Node } from "./Node";

export class LoyalNode implements Node {
    public publicKey: string = Math.random().toString();

    private latestBlock: string;
    private pbft: PBFT;

    constructor(totalNodes: number, public id: string, public gossip: Gossip) {
        this.pbft = new PBFT(totalNodes, gossip, block => this.onNewBlock(block));
    }

    public appendBlock(block: string): void {
        this.pbft.appendBlock({ senderPublicKey: this.publicKey, block });
    }

    public getLatestBlock(): string {
        return this.latestBlock;
    }
    private onNewBlock(block: string): void {
        this.latestBlock = block;
    }
}