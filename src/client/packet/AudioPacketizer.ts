import { MediaUdp } from "../voice/MediaUdp";
import { BaseMediaPacketizer } from "./BaseMediaPacketizer";

const time_inc = (48000 / 100) * 2;

export class AudioPacketizer extends BaseMediaPacketizer {
    constructor(connection: MediaUdp) {
        super(connection, 0x78);
    }

    public override sendFrame(frame:any): void {
       const packet = this.createPacket(frame);
       this.mediaUdp.sendPacket(packet);
       this.onFrameSent();
    }

    public createPacket(chunk: any): Buffer {
        const header = this.makeRtpHeader(this.mediaUdp.mediaConnection.ssrc);

        const nonceBuffer = this.mediaUdp.getNewNonceBuffer();
        return Buffer.concat([header, this.encryptData(chunk, nonceBuffer), nonceBuffer.subarray(0, 4)]);
    }

    public override onFrameSent(): void {
        this.incrementTimestamp(time_inc);
    }
}