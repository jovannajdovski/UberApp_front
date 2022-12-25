import { Component } from '@angular/core';
import { MessageService, Message, ChatType, Chat} from 'src/app/modules/communication/services/message/message.service'
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  public chats: Chat[]=[];
  public chatType=ChatType;

  constructor(private messageService: MessageService){
    this.messageService.observableChats$.subscribe((chats)=>
    {this.chats=chats; });
    
  }
  redirectTo(chat:Chat)
  {
    this.messageService.openChat(chat);
  }
}

