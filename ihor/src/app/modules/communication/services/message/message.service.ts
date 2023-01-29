import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Chat, MessagesResponse, MessageType, MessageRequest, SentMessageResponse } from '../../model/message';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  stompClient:any;
  private chat$ = new BehaviorSubject<Chat>({image: '', name: '', messages: [], rideId:-1, receiverId:-1}); //open chat
  observableChat$ = this.chat$.asObservable();//open chat

  private selectedChatRideId$=new BehaviorSubject<number>(-1);//open chat
  observableSelectedChatRideId$=this.selectedChatRideId$.asObservable();//open chat
  
  private chats$=new BehaviorSubject<Chat[]>([]);
  observableChats$=this.chats$.asObservable();

  constructor(private authService:AuthService, private http: HttpClient) {

   }

  openChat(chat:Chat){
    
    this.chat$.next(chat);
    this.selectedChatRideId$.next(chat.rideId);
    //this.initializeWebSocketConnection(chat);

  }
  public getMessages()
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
    if(result.totalCount>0)
    {
      let loggedUserId=Number(this.authService.getId());
      if(this.authService.getRole()=="ADMIN")
        loggedUserId=0;
      let firstIndex=0, currentOtherUserId, lastOtherUserId=(result.results.at(0)?.receiverId||0)+(result.results.at(0)?.senderId||0)-loggedUserId;
      
      for (let i = 0; i < result.totalCount; i++) {

        currentOtherUserId=(result.results.at(i)?.receiverId||0)+(result.results.at(i)?.senderId||0)-loggedUserId;
        if(result.results.at(i)?.rideId!==result.results.at(firstIndex)?.rideId || currentOtherUserId!==lastOtherUserId)
        {
          const chat=this.createChat(result,firstIndex,i);
          chats.push(chat);
          firstIndex=i;
          lastOtherUserId=currentOtherUserId;
        }
        
      }
      chats.push(this.createChat(result,firstIndex,result.totalCount));
    }
    return chats;
  }
  private createChat(result: MessagesResponse, firstIndex: number, lastIndex: number): Chat {
    const chat:Chat={image: "", name: "", messages: [], rideId:-1, receiverId:-1};
    let userId=Number(this.authService.getId());
    if(this.authService.getRole()=="ADMIN")
      userId=0;
    const anotherUserId=(result.results.at(firstIndex)?.receiverId ||0) +(result.results.at(firstIndex)?.senderId ||0) -userId;
    const rideId=result.results.at(firstIndex)?.rideId||0;
    let message;
    chat.name=this.getUserAndRideInfo(anotherUserId,rideId);
    if(userId==0) chat.name="User id: "+anotherUserId;
    if(anotherUserId==0) chat.name="LIVE SUPPORT";

    chat.rideId=rideId;
    chat.receiverId=anotherUserId;
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
      return "User: " + userId+' ,ride: '+rideId; //dobaviti sa beka
  }
  private getMessagesFromBack():Observable<MessagesResponse>{
    const userId=this.authService.getId();
    return this.http.get<MessagesResponse>(environment.apiHost+'user/'+userId+'/message');
  }
  sendMessage(request: MessageRequest, receiverId: number)
  {
    this.sendMessageToBack(request, receiverId).subscribe({
      next: (result) => {
        let chats=this.chats$.getValue();
        const chat:Chat=chats.find(object => {return object.rideId === result.rideId && (object.receiverId===result.receiverId || object.receiverId===result.senderId)})||{image: '', name: '', messages: [], rideId:-1, receiverId:-1};
        chat.messages.push({timestamp: toDate(result.timeOfSending), content: result.message, myself: true, type: result.type});
        
        chats = chats.filter(item => item !== chat);
        chats.unshift(chat);
        this.chats$.next(chats);

        //this.getMessages();
        //this.openChat(chat);
        const senderId=this.authService.getId();
        this.initializeWebSocketConnection(chat,result.message);
        
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("pera");
        }
      },
     });
  }
  private sendMessageToBack(request: MessageRequest, receiverId: number):Observable<SentMessageResponse>{
    return this.http.post<SentMessageResponse>(environment.apiHost+'user/'+receiverId+'/message', request);
  }
  public sendMultipleMessageToBack(message: MessageRequest, userIds: number[]):Observable<any>{
    return this.http.post<any>(environment.apiHost+"user/send-messages",{"message": message, "userIds": userIds});
  }
  initializeWebSocketConnection(chat:Chat, message:string) {
    const  ws = new SockJS('http://localhost:8080/api/socket');
    this.stompClient = Stomp.over(ws);
    
    this.stompClient.connect({},  () => {
      this.openGlobalSocket(chat, message)
    });

  }
  openGlobalSocket(chat:Chat, message:string) {
    let userId=this.authService.getId();
    if(this.authService.getRole()=="ADMIN")
      userId=0;
    this.stompClient.send("api/socket-subscriber/send/message/"+chat.rideId+"/"+userId+"/"+chat.receiverId,{}, message);
        
  }
}

function toDate(str: any): Date{

  return str;
}


