import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private chat$ = new BehaviorSubject<Chat>({image: '', name: '', messages: [], rideId:-1, receiverId:-1}); //open chat
  observableChat$ = this.chat$.asObservable();//open chat

  private selectedChatRideId$=new BehaviorSubject<number>(-1);//open chat
  observableSelectedChatRideId$=this.selectedChatRideId$.asObservable();//open chat
  
  private chats$=new BehaviorSubject<Chat[]>([]);
  observableChats$=this.chats$.asObservable();

  constructor(private authService:AuthService, private http: HttpClient) {
    this.getMessages();
   }

  openChat(chat:Chat){
    
    this.chat$.next(chat);
    this.selectedChatRideId$.next(chat.rideId);
  }
  private getMessages()
  {
    this.getMessagesFromBack().subscribe({
      next: (result) => {
        this.chats$.next(this.getChatsFromMessages(result));
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
        }
      },
    });
    
  }
  private getChatsFromMessages(result: MessagesResponse) {
    const chats:Chat[]=[];
    let firstIndex=0;
    for (let i = 0; i < result.totalCount; i++) {
      if(result.results.at(i)?.rideId!==result.results.at(firstIndex)?.rideId)
      {
        chats.push(this.createChat(result,firstIndex,i));
        firstIndex=i;
      }
      
    }
    if(result.totalCount>0) chats.push(this.createChat(result,firstIndex,result.totalCount));
    
    return chats;
  }
  private createChat(result: MessagesResponse, firstIndex: number, lastIndex: number): Chat {
    const chat:Chat={image: "", name: "", messages: [], rideId:-1, receiverId:-1};
    const userId=this.authService.getId();
    const anotherUserId=(result.results.at(firstIndex)?.receiverId ||0) +(result.results.at(firstIndex)?.senderId ||0) -userId;
    const rideId=result.results.at(firstIndex)?.rideId||0;
    let message;
    chat.name=this.getUserAndRideInfo(anotherUserId,rideId);
    chat.rideId=rideId;
    chat.receiverId=anotherUserId;
    this.authService.getId();
    for (let i = firstIndex; i < lastIndex; i++)
    {
      message=result.results.at(i);
      
      chat.messages.push({timestamp: toDate(message?.timeOfSending)||new Date(),
         content: message?.message||'',
         myself: userId==message?.senderId,
        type: message?.type||MessageType.RIDE //TODO
      })
    }
    return chat;
  }
  private getUserAndRideInfo(userId:number, rideId:number):string{
      return "Korisnik: " + userId+' ,voznja: '+rideId; //dobaviti sa beka
  }
  private getMessagesFromBack():Observable<MessagesResponse>{
    const userId=this.authService.getId();
    return this.http.get<MessagesResponse>(environment.apiHost+'user/'+userId+'/message');
  }
  sendMessage(request: MessageRequest)
  {
    this.sendMessageToBack(request).subscribe({
      next: (result) => {
        let chats=this.chats$.getValue();
        const chat:Chat=chats.find(object => {return object.rideId === result.rideId;})||{image: '', name: '', messages: [], rideId:-1, receiverId:-1};
        chat.messages.push({timestamp: toDate(result.timeOfSending), content: result.message, myself: true, type: result.type});
        
        chats = chats.filter(item => item !== chat);
        chats.unshift(chat);
        
        this.chats$.next(chats);
        //this.getMessages();
        this.openChat(chat);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
        }
      },
     });

    /*chatsDummy[chatId].messages.push(message);
    this.chats$.next(chatsDummy);
    this.openChat(chatsDummy[chatId]);*/
  }
  private sendMessageToBack(request: MessageRequest):Observable<SentMessageResponse>{
    const userId=this.authService.getId();
    return this.http.post<SentMessageResponse>(environment.apiHost+'user/'+userId+'/message', request);
  }
}
function toDate(str: any): Date{
  const date= new Date();
  date.setFullYear(str[0]);
  date.setMonth((str[1]+12)%13);
  date.setDate(str[2]);
  date.setHours(str[3]);
  date.setMinutes(str[4]);
  return date;
}
export interface MessageRequest{
  "receiverId": number,
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


const date1=new Date('2022-12-16T10:24:00'); //prebaciti u servis
const date2=new Date('2022-12-17T03:24:00');
const date3=new Date('2022-12-18T02:24:00');
const date4=new Date('2022-12-17T06:24:00');
const date5=new Date('2022-12-19T10:24:00');
const message1: Message={ timestamp: date1, content: 'Samo jako', myself: false, type: MessageType.PANIC}
const message2: Message={ timestamp: date2, content: 'BORJAN', myself: true, type: MessageType.RIDE}
const message3: Message={ timestamp: date3, content: 'BORJAN', myself: false, type: MessageType.PANIC}
const message4: Message={ timestamp: date4, content: 'Dobar' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'dan', myself: false, type: MessageType.RIDE}
const message5: Message={ timestamp: date5, content: 'PROFESORE', myself: false, type: MessageType.RIDE}
const messages=[[message1,message2,message3],[message4,message5]];
const chat1={image: "", name: "Mrsulja SUPPORT", messages: messages[0], type: MessageType.SUPPORT,rideId:1, receiverId:1}
const chat2={image: "", name: "Stevan Gostojic", messages: messages[1], type: MessageType.PANIC,rideId:1, receiverId:1}
const chatsDummy=[ 
      chat1,
      chat2,
    ];

