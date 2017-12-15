export default interface Channel {
    id: string;
    name: string;
    customData: ChannelCustomData;
}

export interface ChannelCustomData {
    owner: string;
    memberIds: string[];
}

export interface ChannelOperation {
    path: string;
    op: ChannelOperationType;
    value: Channel | NewChannelDTO | undefined;
}

export enum ChannelOperationType {
    ADD = 'add',
    REPLACE = 'replace',
    REMOVE = 'remove'
}

export interface ChannelDTO {
    id: string;
    name: string;
    customData: string;
}

export interface NewChannelDTO {
    name: string;
    customData: string;
}