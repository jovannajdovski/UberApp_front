import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public chats:any;
  private chat$ = new BehaviorSubject<Chat>({image: '', name: '', messages: [], type: ChatType.RIDE});
  observableChat$ = this.chat$.asObservable();

  private isChatSelected$=new BehaviorSubject<number>(-1);
  observableIsChatSelected$=this.isChatSelected$.asObservable();
  
  private chats$=new BehaviorSubject<Chat[]>(chatsDummy);
  observableChats$=this.chats$.asObservable();

  constructor(private authService:AuthService, private http: HttpClient) {
    const p=this.getMessages();
   }

  openChat(chat:Chat){
    const index = chatsDummy.findIndex(object => {
      return object.name === chat.name;
    });
    this.chat$.next(chat);
    this.isChatSelected$.next(index);
  }
  getMessages()
  {
    //ovde se poziva bek getMessges() stavlja se u chats$
    this.getMessagesFromBack().subscribe({
      next: (result) => {
        console.log("USO");
        console.log(result.totalCount);
        this.chats=this.getChatsFromMessages(result);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
          
        }
      },
    });
    
  }
  
  sendMessage(request: MessageRequest, message:Message, chatId:number)
  {
    const sentMessageResponse=this.sendMessageToBack(request).subscribe({
      next: (result) => {
        
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
        }
      },
     });

    chatsDummy[chatId].messages.push(message);
    this.chats$.next(chatsDummy);
    this.openChat(chatsDummy[chatId]);
  }
  getMessagesFromBack():Observable<MessagesResponse>{
    const userId=this.authService.getId();
    return this.http.get<MessagesResponse>(environment.apiHost+'user/'+userId+'/message');
  }
  sendMessageToBack(request: MessageRequest):Observable<SentMessageResponse>{
    const userId=this.authService.getId();
    return this.http.post<SentMessageResponse>(environment.apiHost+'user/'+userId+'/message', request);
  }

  getChatsFromMessages(result: MessagesResponse) {
    const chats:Chat[]=[];
    let firstIndex=0;
    for (let i = 0; i < result.totalCount; i++) {
      if(result.results.at(i)?.rideId!==result.results.at(firstIndex))
      {
        chats.push(this.createChat(result,firstIndex,i));
        firstIndex=i;
      }
      console.log (result.results.at(i));
    }
    chats.push(this.createChat(result,firstIndex,result.totalCount));
  }
  createChat(result: MessagesResponse, firstIndex: number, lastIndex: number): Chat {
    const chat:Chat={image: "", name: "", messages: [], type: ChatType.PANIC};
    chat.type=ChatType.RIDE;//staviti po porukama
    chat.name=""; //uzeti iz poruka
    /*for (let i = firstIndex; i < lastIndex; i++)
    {
      
    }*/
    return chat;
  }
}

export interface MessageRequest{
  "receiverId": number,
  "message": string,
  "type": ChatType,
  "rideId": number
}
export interface MessagesResponse{
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
  "id": number, // GORE
  "timeOfSending": Date,//message.timestamp
  "senderId": number, //image, name
  "receiverId": number, // isto ili moje
  "message": string, //u message.content
  "type": ChatType,
  "rideId": number // i ovo pise u naslovu
}
export interface Message{
  timestamp: string;
  content: string;
  myself: boolean // u zavisnosti jesam li ja sender/receiver
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
const chat1={image: "", name: "Mrsulja SUPPORT", messages: messages[0], type: ChatType.SUPPORT}
const chat2={image: "", name: "Stevan Gostojic", messages: messages[1], type: ChatType.PANIC}
const chatsDummy=[ 
      chat1,
      chat2,
    ];


