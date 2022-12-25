import { Component } from '@angular/core';
import { MessageService, Message, ChatType, Chat} from 'src/app/modules/communication/services/message/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public message='';
  public chatSelected=false;
  public chat:Chat={image: '', name: '', messages: [], type: ChatType.RIDE};
  public chatType=ChatType;

  constructor(private messageService: MessageService){
    this.messageService.selectedChat$.subscribe((chat)=>
    {this.chat=chat; });
    this.messageService.isChatSelected$.subscribe((value)=>
    {this.chatSelected=value; })
  }
  public sendMessage()
  {
    const message: Message = {
      timestamp:new Date().getHours()+':'+new Date().getMinutes(),
      content: this.message,
      myself: true
    };
    this.messageService.sendMessage(message, 1); //mokovan(salje prvoj osobi)
  }
}
