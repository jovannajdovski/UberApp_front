import { Component } from '@angular/core';
import { MessageService, Message, ChatType, Chat, MessageRequest} from 'src/app/modules/communication/services/message/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public message='';
  public chatIndex=-1;
  public chat:Chat={image: '', name: '', messages: [], type: ChatType.RIDE};
  public chatType=ChatType;
  constructor(private messageService: MessageService){
    this.messageService.observableChat$.subscribe((chat)=>
    {this.chat=chat;});
    this.messageService.observableIsChatSelected$.subscribe((value)=>
    {this.chatIndex=value; })
  }
  public sendMessage()
  {
    const message: Message = {
      timestamp:new Date().toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit',}),
      content: this.message,
      myself: true
    };
    const messageRequest:MessageRequest={
      "receiverId": this.chatIndex, //TODO
      "message": this.message,
      "type": this.chat.type,
      "rideId": this.chatIndex //TODO
    }
    this.messageService.sendMessage(messageRequest,message, this.chatIndex); //mokovan(salje prvoj osobi)
  }
}
