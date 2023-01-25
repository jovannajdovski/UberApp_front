export interface MessageRequest{
    "message": string,
    "type": MessageType,
    "rideId": number
}
export interface MessagesResponse{
"totalCount": number,
"results": [
    {
    "id": number,
    "timeOfSending": object,
    "senderId": number,
    "receiverId": number,
    "message": string,
    "type": MessageType,
    "rideId": number
    }
]
}
export interface SentMessageResponse{
"id": number,
"timeOfSending": Date,
"senderId": number,
"receiverId": number,
"message": string,
"type": MessageType,
"rideId": number
}
export interface Message{
timestamp: Date;
content: string;
myself: boolean
type: MessageType
}
export enum MessageType {
SUPPORT, RIDE, PANIC
}


export interface Chat{
image: string,
name: string,
messages: Message[],
rideId: number,
receiverId: number
}