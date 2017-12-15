export default interface Message {
    id: string;
    value: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    customData: MessageCustomData;
}

export interface MessageCustomData {
    votes: number;
}

export interface MessageDTO {
    id: string;
    value: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    customData: string;
}

export interface NewMessageDTO {
    value: string;
    customData: string;
}