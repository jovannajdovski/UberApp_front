import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private chat$ = new BehaviorSubject<Chat>({image: '', name: '', messages: [], type: ChatType.RIDE});
  observableChat$ = this.chat$.asObservable();

  private isChatSelected$=new BehaviorSubject<number>(-1);
  observableIsChatSelected$=this.isChatSelected$.asObservable();
  
  private chats$=new BehaviorSubject<Chat[]>(chats);
  observableChats$=this.chats$.asObservable();

  constructor(private http: HttpClient) {
    //ovde se poziva bek getMessges() stavlja se u chats$
    const messagesResponse=this.getMessages(0).subscribe({ //token umesto 0
      next: (result) => {
        
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
        }
      },
    });
   }

  openChat(chat:Chat){
    const index = chats.findIndex(object => {
      return object.name === chat.name;
    });
    this.chat$.next(chat);
    this.isChatSelected$.next(index);
  }
  sendMessage(request: MessageRequest, message:Message, chatId:number)
  {
    const sentMessageResponse=this.sendMessageToBack(request,0).subscribe({
      next: (result) => {
        
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
        }
      },
     });

    chats[chatId].messages.push(message);
    this.chats$.next(chats);
    this.openChat(chats[chatId]);
  }
  sendMessageToBack(request: MessageRequest,userId:number):Observable<SentMessageResponse>{
    return this.http.post<SentMessageResponse>(environment.apiHost+'user/'+userId+'/message', request);
  }
  getMessages(userId:number):Observable<MessagesResponse>{
    return this.http.get<MessagesResponse>(environment.apiHost+'user/'+userId+'/message');
  }

}
export interface Message{
  timestamp: string;
  content: string;
  myself: boolean
}
export interface MessageRequest{
  "receiverId": number,
  "message": string,
  "type": ChatType,
  "rideId": number
}
export interface MessagesResponse{
  // na beku sort po sender/receiverId, pa po vremenu,
  // sortirati po poslednjoj za svaku konverzaciju
  "totalCount": number,
  "results": [
    {
      "id": number,
      "timeOfSending": Date,
      "senderId": number,
      "receiverId": number,
      "message": string,
      "type": ChatType,
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
  "type": ChatType,
  "rideId": number
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


const date1=new Date('2022-12-16T10:24:00'); //prebaciti u servis
const date2=new Date('2022-12-17T03:24:00');
const date3=new Date('2022-12-18T02:24:00');
const date4=new Date('2022-12-17T06:24:00');
const date5=new Date('2022-12-19T10:24:00');
const message1: Message={ timestamp: date1.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit',}), content: 'Samo jako', myself: false}
const message2: Message={ timestamp: date2.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit',}), content: 'BORJAN', myself: true}
const message3: Message={ timestamp: date3.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit',}), content: 'BORJAN', myself: false}
const message4: Message={ timestamp: date4.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit',}), content: 'Dobar' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'dan', myself: false}
const message5: Message={ timestamp: date5.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit',}), content: 'PROFESORE', myself: false}
const messages=[[message1,message2,message3],[message4,message5]];
const chat1={image: "", name: "Ivan Mrsulja SUPPORT", messages: messages[0], type: ChatType.SUPPORT}
const chat2={image: "", name: "Stevan Gostojic", messages: messages[1], type: ChatType.PANIC}
const chats=[ 
      chat1,
      chat2,
    ];