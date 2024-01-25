import { StreamConnection } from './StreamConnection';
import { BaseMediaConnection } from './BaseMediaConnection';

export class VoiceConnection extends BaseMediaConnection {
    public streamConnection?: StreamConnection;

    public override get serverId(): string {
        return this.guildId;
    }

    public override stop(): void {
        super.stop();
        this.streamConnection?.stop();
    }
}
