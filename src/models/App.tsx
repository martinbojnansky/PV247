import { ChannelDTO } from './Channel';

export interface App {
    id: string;
    channels: ChannelDTO[];
}