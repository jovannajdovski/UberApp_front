import { Component } from '@angular/core';
import { MessageService, Message, MessageType, Chat} from 'src/app/modules/communication/services/message/message.service'
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  public chats: Chat[]=[];
  public messageType=MessageType;

  constructor(private messageService: MessageService){
    this.messageService.observableChats$.subscribe((chats)=>
    {this.chats=chats; });
    
  }
  redirectTo(chat:Chat)
  {
    this.messageService.openChat(chat);
  }
  public shortDate(date:Date):string
  {
    return new Date(date).getHours()+":"+new Date(date).getMinutes();
  }
}

