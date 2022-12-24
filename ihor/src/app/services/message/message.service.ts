import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
}
export interface Message{
  timestamp: string;
  content: string;
  myself: boolean
}
export enum ChatType {
  SUPPORT, PANIC, RIDE
}
export interface Chat{
  image: string,
  name: string,
  messages: Message[],
  type: ChatType
}
