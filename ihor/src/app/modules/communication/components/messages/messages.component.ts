import { Component, OnInit } from '@angular/core';
import { MessageService} from 'src/app/modules/communication/services/message/message.service'
import { Chat, MessageType } from '../../model/message';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  public chats: Chat[]=[];
  public messageType=MessageType;
  stompClient:any;
  constructor(private messageService: MessageService, private authService:AuthService){
    
    
  }
  ngOnInit(){
    this.messageService.getMessages();
    this.messageService.observableChats$.subscribe((chats)=>
    {this.chats=chats;
     });
     this.initializeWebSocketConnection();
  }
  redirectTo(chat:Chat)
  {
    this.messageService.openChat(chat);
  }
  public shortDate(date:Date):string
  {
    return new Date(date).getHours().toString().padStart(2, "0")+":"+new Date(date).getMinutes().toString().padStart(2, "0");
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewChecked()
  {
    const scrollableContainer = document.getElementById("messages_container");
      if(scrollableContainer!=null)
      {
        scrollableContainer.scrollTo(0,scrollableContainer.scrollHeight);
      }
  }
  initializeWebSocketConnection() {
    const  ws = new SockJS('http://localhost:8080/api/socket');
    this.stompClient = Stomp.over(ws);
    
    this.stompClient.connect({},  () => {
      this.openGlobalSocket()
    });

  }
  openGlobalSocket() {
    const userId=this.authService.getId();
    this.stompClient.subscribe("api/socket-publisher/user-chat/"+userId, (message: {body: string }) => {
      this.handleResult(message);
    });
  }

  handleResult(message: { body: string }) {
    if (message.body) {
      console.log(message.body);
      const userMessage: {"message":string, "fromId":number,"rideId":number} = JSON.parse(message.body);

      const chat:Chat=this.chats.find(object => {return object.rideId === userMessage.rideId && (object.receiverId===userMessage.fromId || object.receiverId===Number(this.authService.getId()))})||{image: '', name: '', messages: [], rideId:-1, receiverId:-1};
      chat.messages.push({timestamp: new Date(), content: userMessage.message, myself: false, type: MessageType.RIDE});
      
      this.chats = this.chats.filter(item => item !== chat);
      this.chats.unshift(chat);
      
    }
  }
}


