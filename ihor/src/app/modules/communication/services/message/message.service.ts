import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private chat$ = new BehaviorSubject<Chat>({image: '', name: '', messages: [], type: ChatType.RIDE});
  private chatSelected$=new BehaviorSubject<boolean>(false);
  selectedChat$ = this.chat$.asObservable();
  isChatSelected$=this.chatSelected$.asObservable();
  constructor() { }

  openChat(chat:Chat){
    console.log("Chat opened "+chat.name);
    this.chat$.next(chat);
    this.chatSelected$.next(true);
  }
  sendMessage(message:Message, chatId:number) //dodati u niz koji je dodat ovde
  {

  }
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
